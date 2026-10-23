# Public domino image sources for Domino Score AI

This file tracks candidate public datasets for training. Review each source's license and label schema before combining or redistributing data.

## Recommended starting sources

1. **domino-5 (Roboflow Universe)** — https://universe.roboflow.com/proyect-train/domino-5  
   - Listed as CC BY 4.0 and about 5,758 images.
   - Labels are 28 whole-tile classes (the double-six combinations), not the seven half-tile pip classes currently declared in `data.yaml`.
   - Useful for whole-tile detection/classification, but annotations must be converted or the training task/config changed before using it with the current seven-class half-tile model.

2. **Domino tiles (Roboflow Universe)** — https://universe.roboflow.com/moaz-taha-9jg90/domino-tiles  
   - Listed as Public Domain; the dataset page reports 600 images across 11 versions.
   - The visible class schema is only four classes and may not cover all 0–6 values, so inspect an exported version before training.

3. **DominoDataset2 (Hugging Face)** — https://huggingface.co/datasets/aviola/DominoDataset2  
   - Listed as CC BY 4.0; the dataset card reports 274 annotated images in COCO format.
   - Small, but can be useful for an initial experiment after checking what the boxes represent.

4. **Dominoe Pips (Roboflow Universe)** — https://universe.roboflow.com/dominoecount/dominoe-pips  
   - Listed as CC BY 4.0; reports thousands of images, but its public labels are a single `Pips` class.
   - Helpful for detecting pip locations, but not sufficient alone to train a seven-class pip-value detector.

## Important compatibility note

The current `ai-training/data.yaml` defines seven classes, `pip_value_0` through `pip_value_6`, intended for individual domino halves. None of the sources above should be dropped into that dataset unchanged without verifying and converting the annotations. Whole-tile classes such as `0-6` are not the same thing as a bounding box around each half.

## Download and prepare

- Open the source dataset page and choose a dataset version and YOLO export compatible with its license and terms.
- Keep the source's license/attribution information alongside the downloaded data.
- Merge the exported `images/train`, `images/valid` and label files into the project's dataset only after normalizing class IDs and annotation semantics.
- Split by original photo/session, not by augmented copies, to reduce train/validation leakage.
- Never commit large image archives or model weights to Git unless repository size and licensing are appropriate; use Git LFS or dataset hosting for large assets.
- Evaluate on photos taken with the target Android phone and on backgrounds/lighting not seen during training.

No image files or trained weights are bundled in this repository yet. A dataset is only ready for training after its annotations have been inspected and mapped to the selected seven-class task.
