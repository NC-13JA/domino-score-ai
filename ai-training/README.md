# Domino Score AI — model training starter

This folder prepares a repeatable path to fine-tune a pretrained YOLO model for **double-six dominoes**.

## Important
There is no trustworthy general-purpose pretrained model that already understands domino pip values. A generic pretrained model will not reliably count pips. Fine-tuning requires labeled domino photos. The app's current OpenCV detector remains the active fallback until a trained model is evaluated and packaged.

## Dataset layout
Create this layout on a computer or cloud notebook (phone-only dataset labeling is possible but slow):

```
dataset/
  images/
    train/
    val/
  labels/
    train/
    val/
```

Use YOLO detection labels: one line per object, normalized `class x_center y_center width height`. Define 7 classes in `data.yaml` for pip values 0 through 6, and label each *half-tile* as one object. Keep validation photos from different sessions/backgrounds than training photos. Include blank halves, doubles, shadows, angled tiles, light and dark surfaces, and partial occlusion.

## Recommended training
Use a cloud notebook or a computer with Python. Training on an Android phone is not a practical first choice: it is slow, hot, memory-constrained, and difficult to reproduce. The phone can capture and review examples, while training runs elsewhere.

Install `ultralytics`, then fine-tune a small pretrained detector (for example `yolo11n.pt`) on your labeled dataset. Do not ship the resulting model until precision/recall and full-photo total-count accuracy have been tested on held-out photos.

## Android integration gate
Before enabling a model in the app:
1. Export to a mobile runtime format supported by the app.
2. Add the model and runtime to the Android build.
3. Test model loading offline on the actual device.
4. Compare predictions with the existing OpenCV fallback.
5. Keep uncertain detections reviewable; never silently treat low-confidence predictions as ground truth.

No trained weights are included yet because the repository currently contains no labeled domino dataset.