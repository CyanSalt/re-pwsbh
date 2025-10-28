#!/bin/sh

cwd=$(dirname "$0")
echo "cask \"re-pwsbh\" do
  arch arm: \"arm64\", intel: \"x64\"

  version \"$(node -e "console.log(require('${cwd}/../package.json').version)")\"
  sha256 arm:   \"$(shasum -a 256 "${cwd}/../release/PowerfulWindSlickedBackHair-darwin-arm64.zip" | cut -d' ' -f1)\",
         intel: \"$(shasum -a 256 "${cwd}/../release/PowerfulWindSlickedBackHair-darwin-x64.zip" | cut -d' ' -f1)\"

  url \"https://github.com/CyanSalt/re-pwsbh/releases/download/v#{version}/PowerfulWindSlickedBackHair-darwin-#{arch}.zip\"
  name \"PowerfulWindSlickedBackHair\"
  homepage \"https://github.com/CyanSalt/re-pwsbh\"

  app \"PowerfulWindSlickedBackHair-darwin-#{arch}/PowerfulWindSlickedBackHair.app\"
end" | pbcopy
