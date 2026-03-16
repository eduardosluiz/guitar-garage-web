# LIMPEZA_FINAL.ps1 - Guitar Garage Deploy Cleanup
# Rodar na pasta: C:\Users\dude_\guitar_garage\guitar_garage

Write-Host "Iniciando limpeza de segurança do projeto..." -ForegroundColor Cyan

# Lista de arquivos para apagar
$files = @(
    "src/app/api/setup-admin/route.ts",
    "src/scripts/create-admin.ts",
    "src/scripts/seed-admin.ts",
    "COMANDO_LOGIN.txt",
    "seed-command.txt",
    "fix-admin.txt"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        Remove-Item $f -Force
        Write-Host "Deletado: $f" -ForegroundColor Green
    }
}

# Git Commands
Write-Host "Enviando atualizações para o GitHub..." -ForegroundColor Cyan
git add .
git commit -m "security: final cleanup of setup and seed files"
git push origin main

Write-Host "Limpeza concluída com sucesso! 🚀🟢" -ForegroundColor Green
Write-Host "Agora vá no Easypanel e clique em Deploy para finalizar." -ForegroundColor Cyan
