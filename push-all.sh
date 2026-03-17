#!/usr/bin/env bash
# 将当前仓库下所有子目录（含新项目）作为普通目录加入并推送到远程
# 用法：在 nestjs-code 根目录执行 ./push-all.sh

set -e
cd "$(dirname "$0")"

echo "==> 检查子目录中的 .git（避免被当作 submodule）..."
for dir in */; do
  dir="${dir%/}"
  if [ -d "$dir/.git" ]; then
    echo "    移除 $dir/.git"
    rm -rf "$dir/.git"
  fi
done

echo "==> 添加所有变更..."
git add .

if git diff --cached --quiet; then
  echo "==> 没有需要提交的变更，已是最新。"
  git status --short
  exit 0
fi

echo "==> 提交（请输入 commit message，直接回车则打开编辑器）..."
read -r -p "commit message: " msg
if [ -n "$msg" ]; then
  git commit -m "$msg"
else
  git commit
fi

echo "==> 推送..."
git push

echo "==> 完成。"
