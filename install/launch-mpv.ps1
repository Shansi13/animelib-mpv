param(
    [string]$Uri
)

$mpv = "C:\Program Files (x86)\mpv\bootstrapper\mpv.exe"

$query = ([uri]$Uri).Query.TrimStart("?")
$params = @{}

foreach ($part in ($query -split "&")) {
    $kv = $part -split "=", 2

    if ($kv.Count -eq 2) {
        $params[$kv[0]] = [uri]::UnescapeDataString(
            $kv[1].Replace("+", " ")
        )
    }
}

$url = $params["url"]
$sub = $params["sub"]
$referer = $params["referer"]

if (-not $url) {
    exit
}

$userAgent = "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"

$mpvArgs = @(
    "--referrer=$referer"
    $userAgent
)

if ($sub) {
    $mpvArgs += "--sub-file=$sub"
}

$mpvArgs += $url

& $mpv $mpvArgs
