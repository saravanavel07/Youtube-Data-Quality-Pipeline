#!/usr/bin/env python3
"""
run_checks.py
Main CLI script that executes the YouTube Data Quality Pipeline against video datasets.
Uses Python standard library only.
"""

import json
import sys
from pathlib import Path
from typing import List, Dict, Any

# Ensure local pipeline module is discoverable
sys.path.insert(0, str(Path(__file__).parent))
from quality_rules import evaluate_video, batch_fix_video_warnings, PASSED, WARNING, FAILED


def supports_color() -> bool:
    """Checks whether the standard output supports ANSI color codes."""
    return hasattr(sys.stdout, "isatty") and sys.stdout.isatty()


USE_COLOR = supports_color()

RED = "\033[91m" if USE_COLOR else ""
GREEN = "\033[92m" if USE_COLOR else ""
YELLOW = "\033[93m" if USE_COLOR else ""
BOLD = "\033[1m" if USE_COLOR else ""
GRAY = "\033[90m" if USE_COLOR else ""
CYAN = "\033[96m" if USE_COLOR else ""
RESET = "\033[0m" if USE_COLOR else ""


def load_dataset(file_path: Path) -> List[Dict[str, Any]]:
    """Loads video records from a JSON file."""
    if not file_path.exists():
        print(f"{RED}Error: Dataset file not found at '{file_path}'{RESET}", file=sys.stderr)
        sys.exit(1)

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if not isinstance(data, list):
                print(f"{RED}Error: Expected a JSON array of video objects.{RESET}", file=sys.stderr)
                sys.exit(1)
            return data
    except json.JSONDecodeError as err:
        print(f"{RED}Error parsing JSON ({file_path}): {err}{RESET}", file=sys.stderr)
        sys.exit(1)


def print_banner():
    """Prints the YouTube-styled header banner."""
    print(f"\n{RED}▶{RESET} {BOLD}YouTube Data Quality Pipeline{RESET} {GRAY}— Creator Health & Metadata Audit{RESET}")
    print(f"{GRAY}{'─' * 76}{RESET}")


def format_status_badge(status: str) -> str:
    if status == PASSED:
        return f"{GREEN}[✓ PASS]{RESET}"
    elif status == WARNING:
        return f"{YELLOW}[▲ WARN]{RESET}"
    else:
        return f"{RED}[✖ FAIL]{RESET}"


def run_pipeline(data_path: Path, output_json: bool = False, export_path: str = None, fix_warnings: bool = False):
    videos = load_dataset(data_path)

    if fix_warnings:
        print_banner()
        print(f"{BOLD}Applying batch recommended fixes to warning videos...{RESET}\n")
        applied_count = 0
        fixed_videos = []
        for v in videos:
            eval_res = evaluate_video(v)
            if eval_res["overall_status"] == WARNING:
                fixed_v, actions = batch_fix_video_warnings(v)
                fixed_videos.append(fixed_v)
                applied_count += 1
                title = v.get("title", "")
                if len(title) > 40:
                    title = title[:37] + "..."
                print(f"  {YELLOW}▶ [FIXED]{RESET} {BOLD}{title}{RESET}")
                for act in actions:
                    print(f"     {GRAY}• {act}{RESET}")
            else:
                fixed_videos.append(v)

        print(f"\n{GREEN}✓ Batch applied recommended fixes to {applied_count} warning video(s).{RESET}\n")
        print(f"{GRAY}{'─' * 76}{RESET}\n")
        videos = fixed_videos

    evaluated = [evaluate_video(v) for v in videos]

    total_count = len(evaluated)
    passed_count = sum(1 for e in evaluated if e["overall_status"] == PASSED)
    warning_count = sum(1 for e in evaluated if e["overall_status"] == WARNING)
    failed_count = sum(1 for e in evaluated if e["overall_status"] == FAILED)
    pass_percentage = (passed_count / total_count * 100) if total_count else 0.0
    current_health_score = round(((passed_count * 1.0 + warning_count * 0.5) / total_count * 100), 1) if total_count else 0.0

    # Historical trend tracking
    history_file = Path(__file__).parent / "history.json"
    historical_delta_str = ""
    if history_file.exists():
        try:
            with open(history_file, "r", encoding="utf-8") as hf:
                history_data = json.load(hf)
                if isinstance(history_data, list) and len(history_data) > 0:
                    last_run = history_data[-1]
                    prev_score = float(last_run.get("health_score", 0.0))
                    delta = current_health_score - prev_score
                    prev_date = last_run.get("timestamp", "")[:10]
                    if delta > 0:
                        historical_delta_str = f"{GREEN}▲ +{delta:.1f}%{RESET} {GRAY}(vs {prev_date}){RESET}"
                    elif delta < 0:
                        historical_delta_str = f"{RED}▼ {delta:.1f}%{RESET} {GRAY}(vs {prev_date}){RESET}"
                    else:
                        historical_delta_str = f"{GRAY}― 0.0% (vs {prev_date}){RESET}"
        except Exception:
            pass

    summary_stats = {
        "dataset": data_path.name,
        "total_videos": total_count,
        "passed": passed_count,
        "warnings": warning_count,
        "failed": failed_count,
        "pass_rate_percentage": round(pass_percentage, 1),
        "health_score": current_health_score,
        "results": evaluated,
    }

    if export_path:
        with open(export_path, "w", encoding="utf-8") as out_f:
            json.dump(summary_stats, out_f, indent=2)
        print(f"{GREEN}✓ Successfully exported audit report to '{export_path}'{RESET}")

    if output_json:
        print(json.dumps(summary_stats, indent=2))
        return

    print_banner()

    # Overview Metrics Box with Historical Trend
    print(f"{BOLD}Batch Overview:{RESET} Audited {total_count} videos from {CYAN}{data_path.name}{RESET}\n")
    print(f"  {BOLD}Health Score:{RESET} {current_health_score:.1f}%  {historical_delta_str}")
    print(f"  {GREEN}Passed:{RESET}       {passed_count:>2} / {total_count} ({pass_percentage:.1f}%)")
    print(f"  {YELLOW}Warnings:{RESET}     {warning_count:>2} / {total_count}")
    print(f"  {RED}Failed:{RESET}       {failed_count:>2} / {total_count}")
    print(f"{GRAY}{'─' * 76}{RESET}\n")

    # Itemized Breakdown
    print(f"{BOLD}DETAILED VIDEO AUDIT BREAKDOWN:{RESET}\n")

    for idx, item in enumerate(evaluated, 1):
        status_badge = format_status_badge(item["overall_status"])
        title = item["title"]
        if len(title) > 56:
            title = title[:53] + "..."

        views = item["view_count"]
        likes = item["like_count"]

        print(f"{idx:02d}. {status_badge} {BOLD}{title}{RESET}")
        print(f"    {GRAY}ID: {item['video_id']} | Views: {views:,} | Likes: {likes:,}{RESET}")

        flagged_checks = [c for c in item["checks"] if c["status"] != PASSED]
        if flagged_checks:
            for check in flagged_checks:
                symbol = f"{RED}✖{RESET}" if check["status"] == FAILED else f"{YELLOW}▲{RESET}"
                print(f"    {symbol} {check['category']} → {check['rule']}: {check['message']}")
                if check["suggestion"]:
                    print(f"      {GRAY}Action: {check['suggestion']}{RESET}")
        else:
            print(f"    {GREEN}✓ All quality rules passed cleanly.{RESET}")

        print()

    # Final Summary Banner
    print(f"{GRAY}{'─' * 76}{RESET}")
    if failed_count > 0:
        print(f"{RED}{BOLD}Pipeline Status: FAILED{RESET} — {failed_count} video(s) have critical data flaws requiring creator fixes.")
    elif warning_count > 0:
        print(f"{YELLOW}{BOLD}Pipeline Status: OPTIMIZATION NEEDED{RESET} — All critical checks passed, but {warning_count} video(s) have discoverability warnings.")
    else:
        print(f"{GREEN}{BOLD}Pipeline Status: PRISTINE{RESET} — All audited videos meet high YouTube data quality standards.")
    print()


def main():
    default_data_file = Path(__file__).parent / "sample_data.json"
    target_file = default_data_file
    output_json = False
    export_path = None
    fix_warnings = False

    args = sys.argv[1:]
    if "--help" in args or "-h" in args:
        print("Usage: python3 run_checks.py [options] [path/to/data.json]")
        print("\nOptions:")
        print("  --fix-warnings     Batch apply recommended metadata fixes to all warning videos")
        print("  --json             Output raw JSON results for automated pipelines")
        print("  --export <file>    Export audit summary to specified JSON file path")
        print("  -h, --help         Show this help message")
        sys.exit(0)

    if "--fix-warnings" in args:
        fix_warnings = True
        args = [a for a in args if a != "--fix-warnings"]

    if "--json" in args:
        output_json = True
        args = [a for a in args if a != "--json"]

    if "--export" in args:
        idx = args.index("--export")
        if idx + 1 < len(args):
            export_path = args[idx + 1]
            del args[idx:idx + 2]
        else:
            print(f"{RED}Error: --export requires a file path argument.{RESET}", file=sys.stderr)
            sys.exit(1)

    if args:
        target_file = Path(args[0])

    run_pipeline(target_file, output_json=output_json, export_path=export_path, fix_warnings=fix_warnings)


if __name__ == "__main__":
    main()
