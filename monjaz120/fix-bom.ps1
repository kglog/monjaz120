# سكريبت لإزالة BOM من بداية ملف package.json
$path = "package.json"
$content = Get-Content $path -Raw
if ($content.StartsWith("`uFEFF")) {
    $content = $content.Substring(1)
    Set-Content $path $content -NoNewline
    Write-Host "تمت إزالة BOM بنجاح."
} else {
    Write-Host "لا يوجد BOM في الملف."
}