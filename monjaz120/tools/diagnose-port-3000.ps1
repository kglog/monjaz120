$port=3000
$c = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if ($c) {
  $p = Get-CimInstance Win32_Process -Filter "ProcessId=$($c.OwningProcess)"
  "PID: $($c.OwningProcess)"
  "Name: $($p.Name)"
  "Path: $($p.ExecutablePath)"
  "Cmd:  $($p.CommandLine)"
  taskkill /PID $($c.OwningProcess) /F
} else { "لا أحد ماسك 3000" }
