# Website update — November 12, 2026

Updated both English and Japanese pages to match the current ProxyFit app.

## What changed
- Meals & Health: the current feature name, food/meal search, saved and custom meals, decimal servings, editable values, and optional Macros from Photos.
- Expanded nutrition: calories, protein, carbs, fat, fiber, total/added sugars, saturated/trans fat, sodium, potassium, targets/limits, and trend explanations.
- Idle adventure: Auto and Tap Skills, shared multi-tap cooldowns, permanent stages, pushing/farming, automatic Spotters, and up to 12 hours of away progress.
- Workout connection: XP and Stat Points, the first daily exercise's 12-hour +50% damage boost, and Battle Coins converted at 10:1 to Spotter Points.
- Current class skills: advanced Tap Skills included free; the same skills unlock in the Auto slot at character level 5.
- Cleaner workout screens, keyboard controls, Premium previous-performance access, and the expanded exercise demo overview.
- Homepage, app guide, nutrition guide, plans, coaching, related fitness pages, navigation names, and page/search descriptions updated together.
- Retired battle screenshot replaced with the existing class animation; hero now uses the existing meal overview image. Existing exercise photos, videos, and other media are preserved.

## Apply to the existing website
1. Extract this ZIP.
2. Upload the contents of its proxyfit-site folder to the existing website root, preserving subfolders such as jp. Overwrite matching files.
3. If your host builds or deploys static files, deploy the updated folder through your normal process. Refresh cached files if necessary.

This package updates website files; it does not publish changes to proxyfit.app by itself. No app build or backend change is needed for this website update.

## Verification
- Checked all 64 HTML pages and 1,747 local links/assets: no missing files, missing anchor targets, or duplicate IDs.
- Browser-reviewed the English homepage, idle skill instructions, meal logging, nutrient table, and Japanese guides/plans. Expandable instructions worked.
- Desktop layouts and image loading checked. A mobile viewport was unavailable in this preview; existing responsive layouts are retained, with responsive styling for the replacement animation.
- Existing exercise-media bytes are preserved in the full website archive.

## Earlier update notes

# Leg demos and release 1.0.13

## Included updates
- Leg Extension: 10-second demonstration, trimmed from IMG_8532.MOV (7.2–17.2 seconds), plus start and extended-position photos.
- Lying Leg Curl: 11-second demonstration, trimmed from IMG_8533.MOV (4.8–15.8 seconds), plus start and curled-position photos.
- Videos are silent H.264 MP4s, 720 × 720, optimized for web playback. Photos are 640 × 640 JPEGs. Original recordings are unchanged.
- English and Japanese exercise pages, index cards, related exercise links, and sitemap entries are included.
- The app shows the photos for Leg Extension, Leg Curl, and Hamstring Curl. The leg curl guide identifies the demonstrated lying variation.
- Black Mage Skin and Red Warrior Skin now have Japanese names and descriptions across Battle, character equipment, the shop, previews, and unlock messages.
- Release version is 1.0.13. Existing EAS production build number auto-increment remains enabled.
- iOS declares English and Japanese, and includes English/Japanese permission strings in native localized resources.

## Apply the update
1. Merge the website files into the existing site and upload them to proxyfit.app. Keep the included folder structure. The app's demo buttons use these new website pages.
2. Merge the app files into the current ProxyFit project.
3. Create a new production EAS build for submission. The iOS localization and native permission strings require a new binary; an Expo JavaScript update alone cannot apply them.
4. Submit release 1.0.13 in App Store Connect. The App Store Languages field is derived from the submitted app's localizations. The current live listing will not change until the new release is processed and published.

## Validation
- Full-project TypeScript check passed.
- All 34 existing automated checks passed.
- Actual guide and skin helpers checked in both languages, including photo paths and the Hamstring Curl alias.
- iOS prebuild passed in an isolated copy. Generated Info.plist declares en/ja and version 1.0.13; both InfoPlist.strings files are included in the generated Xcode project.
- 186 local website references checked across six new/updated pages. HTML nesting, language routes, media paths, and sitemap entries checked.
- Both compressed videos decoded without errors; duration, dimensions, codec, absence of audio, and web fast-start layout checked. Extracted photos were visually reviewed.
- No signed store build, on-device runtime test, live website deployment, or App Store submission was performed here.

## Release references
- Apple: https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundlelocalizations
- Apple language handling: https://developer.apple.com/library/archive/qa/qa1828/_index.html
- Expo app version management: https://docs.expo.dev/build-reference/app-versions/
