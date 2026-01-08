Param([string]$root = ".")
$ErrorActionPreference = "Stop"
$files = Get-ChildItem -Path $root -Recurse -Include *.ts,*.tsx,*.js,*.jsx,*.prisma,*.md | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.git\\" }
$violations = @()
foreach ($f in $files) {
  $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
  if ($null -eq $content) { continue }
  if ($content -notmatch "//\s*ASSISTANT_FINAL:\s*true") {
    $violations += $f.FullName
  }
}
if ($violations.Count -gt 0) {
  Write-Host " Assistant rules violations found:" -ForegroundColor Red
  $violations | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
  # write report
  $report = "## Violations report - $(Get-Date -Format o)`n" + ($violations | ForEach-Object { "- $_" } | Out-String)
  $report | Out-File -FilePath "VIOLATIONS.md" -Encoding UTF8
  exit 1
} else {
  Write-Host "✅ All files passed ASSISTANT_FINAL check."
  exit 0
}
