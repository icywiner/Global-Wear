$ErrorActionPreference = 'Stop'

function Read-SecretText([string]$Prompt) {
  $secureValue = Read-Host $Prompt -AsSecureString
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
  }
}

$databasePassword = Read-SecretText 'Contraseña de PostgreSQL'
$secretKey = Read-SecretText 'SUPABASE_SECRET_KEY'
$encodedPassword = [Uri]::EscapeDataString($databasePassword)

$env:SUPABASE_DB_URL = "postgresql://postgres:$encodedPassword@db.jhqxtjfkctrclyjyvaov.supabase.co:5432/postgres"
$env:SUPABASE_SECRET_KEY = $secretKey

try {
  npm.cmd run migrate:supabase
} finally {
  Remove-Item Env:SUPABASE_DB_URL -ErrorAction SilentlyContinue
  Remove-Item Env:SUPABASE_SECRET_KEY -ErrorAction SilentlyContinue
}