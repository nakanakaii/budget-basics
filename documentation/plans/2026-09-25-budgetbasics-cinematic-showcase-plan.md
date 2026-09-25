# BudgetBasics Cinematic Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify an 18-scene, 2–3 minute, brand-led cinematic PowerPoint showcase of the completed BudgetBasics website.

**Architecture:** Reuse the existing screenshot capture set and artifact-tool presentation pipeline. Replace the static deck builder with a single cinematic scene builder, then apply native Morph and automatic timings through a small OOXML post-processing script. Keep build artifacts under `.pptx-build/` and publish one final deck under `documentation/`.

**Tech Stack:** Node.js, `@oai/artifact-tool`, Python standard library `zipfile`, PowerPoint OOXML, bundled presentation validators and renderer.

---

### Task 1: Build the cinematic 18-scene deck

**Files:**
- Create: `.pptx-build/build_cinematic.mjs`
- Reuse: `.pptx-build/screens/*.png`
- Reuse: `.pptx-build/logos/*.png`
- Output: `documentation/BudgetBasics-Cinematic-Showcase-Source.pptx`

- [ ] **Step 1: Add a scene-count self-check**

At the end of `.pptx-build/build_cinematic.mjs`, assert the storyboard produced exactly 18 slides before export:

```js
if (presentation.slides.items.length !== 18) {
  throw new Error(`Expected 18 scenes, got ${presentation.slides.items.length}`)
}
```

- [ ] **Step 2: Run the builder before implementation and verify it fails**

Run:

```powershell
& $env:RUNTIME_NODE '.pptx-build\build_cinematic.mjs'
```

Expected: failure because `.pptx-build/build_cinematic.mjs` does not exist.

- [ ] **Step 3: Implement the minimum cinematic builder**

Create one builder with shared helpers for text, shapes, screenshots, logos, glow circles, orbit lines, browser frames, slide notes, and scene numbering. Use the approved 18-scene storyboard in `documentation/design/2026-09-25-budgetbasics-cinematic-showcase-design.md`.

The opening scene must contain these exact strings:

```text
CTRL+ALT+DEFEAT
Ahmed Abdulaziz Dahan
Ahmed Mujahed Al-Shabibi
Mohamed Saleh Al-Duais
Alaa Aldeen Kamel Anaam
```

Use the existing `aptech.png`, `techwiz7.png`, and `al-nasser.png` marks. Alternate dark forest scenes with cream product scenes. Keep promotional on-slide copy short and place narration details in speaker notes.

- [ ] **Step 4: Build and finalize the source deck**

Run:

```powershell
$env:RUNTIME_NODE='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$env:RUNTIME_NODE_MODULES='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:RUNTIME_BIN_DIR='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\override'
& $env:RUNTIME_NODE '.pptx-build\build_cinematic.mjs'
```

Expected: `documentation/BudgetBasics-Cinematic-Showcase-Source.pptx` exists and the finalizer reports 18 slides.

### Task 2: Add native Morph and automatic timing

**Files:**
- Create: `.pptx-build/add_cinematic_morph.py`
- Input: `documentation/BudgetBasics-Cinematic-Showcase-Source.pptx`
- Output: `documentation/BudgetBasics-Cinematic-Showcase.pptx`

- [ ] **Step 1: Add package assertions**

The script must assert:

```python
assert len(slides) == 18
assert all('<p159:morph option="byObject"/>' in xml for xml in slides[1:])
assert 140_000 <= sum(ADVANCE_MS) <= 170_000
assert all(f'advTm="{ms}"' in xml for xml, ms in zip(slides, ADVANCE_MS))
```

- [ ] **Step 2: Run the script before implementation and verify it fails**

Run:

```powershell
& $env:RUNTIME_PYTHON '.pptx-build\add_cinematic_morph.py'
```

Expected: failure because the script does not exist.

- [ ] **Step 3: Implement OOXML post-processing**

Use only Python standard-library `zipfile` and `re`. Add the `mc` and `p159` namespaces, apply Morph to slides 2–18, add fade fallback, and add automatic advance values totaling about 150 seconds. Give paired calculator and planner screenshots explicit `!!` Morph names on their source and destination scenes.

- [ ] **Step 4: Create and structurally validate the final deck**

Run:

```powershell
$env:RUNTIME_PYTHON='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $env:RUNTIME_PYTHON '.pptx-build\add_cinematic_morph.py'
& $env:RUNTIME_PYTHON 'C:\Users\Ahmed\.codex\plugins\cache\openai-primary-runtime\presentations\26.909.12148\skills\presentations\container_tools\inspect_presentation_package_integrity.py' 'documentation\BudgetBasics-Cinematic-Showcase.pptx'
```

Expected: the script prints the final path and the integrity validator returns `"status": "pass"` with `"slide_count": 18`.

### Task 3: Render, inspect, and deliver

**Files:**
- Verify: `documentation/BudgetBasics-Cinematic-Showcase.pptx`
- Render: `.pptx-build/render-cinematic-final/slide-1.png` through `slide-18.png`

- [ ] **Step 1: Run automated layout checks**

Run:

```powershell
$env:RUNTIME_NODE='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$env:RUNTIME_NODE_MODULES='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:RUNTIME_BIN_DIR='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\override'
$env:RUNTIME_PYTHON='C:\Users\Ahmed\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $env:RUNTIME_PYTHON 'C:\Users\Ahmed\.codex\plugins\cache\openai-primary-runtime\presentations\26.909.12148\skills\presentations\container_tools\slides_test.py' 'documentation\BudgetBasics-Cinematic-Showcase.pptx'
```

Expected: `Test passed. No overflow detected.`

- [ ] **Step 2: Render all scenes**

Run:

```powershell
& $env:RUNTIME_PYTHON 'C:\Users\Ahmed\.codex\plugins\cache\openai-primary-runtime\presentations\26.909.12148\skills\presentations\container_tools\render_slides.py' 'documentation\BudgetBasics-Cinematic-Showcase.pptx' --output_dir '.pptx-build\render-cinematic-final'
```

Expected: 18 PNG files are produced.

- [ ] **Step 3: Visually inspect every rendered scene**

Inspect slides 1–18 individually at original resolution. Confirm readable logos and names, consistent glow treatment, clean crops, no clipped headings, no accidental personal data, and coherent dark/light alternation. Correct the builder and rerun Tasks 1–3 if any scene fails.

- [ ] **Step 4: Verify final deliverable metadata**

Confirm the final deck contains 18 notes parts, native Morph on slides 2–18, automatic advance totaling 140–170 seconds, and a readable opening scene with all required credits.

- [ ] **Step 5: Open the final deck for the user**

Open `documentation/BudgetBasics-Cinematic-Showcase.pptx` in the Codex file panel and report only the final deliverable.

