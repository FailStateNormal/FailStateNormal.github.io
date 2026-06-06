@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==========================================
echo            更新网站到 GitHub
echo ==========================================
echo.
echo 本次改动的文件：
git status -s
echo.

set "msg=update site"
set /p "input=请输入本次更新说明（直接回车用默认）: "
if not "%input%"=="" set "msg=%input%"
echo.

echo [1/3] 收集改动...
git add -A

echo [2/3] 保存快照...
git commit -m "%msg%"

echo [3/3] 推送到 GitHub...
git push origin main

echo.
echo ==========================================
echo  完成！1~2 分钟后刷新网站查看：
echo  https://FailStateNormal.github.io
echo ==========================================
echo.
pause
