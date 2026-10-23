"""Fine-tune a small pretrained YOLO detector on labeled domino half-tiles.

Run from repository root after preparing dataset/ and installing ultralytics:
    python -m pip install ultralytics
    python ai-training/train.py

This script does not run in the Android app; it produces candidate weights that
must be evaluated and exported before mobile integration.
"""
from pathlib import Path
from ultralytics import YOLO

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "ai-training" / "data.yaml"
if not (ROOT / "dataset" / "images" / "train").exists():
    raise SystemExit(
        "No labeled dataset found. See ai-training/README.md; "
        "collect and label double-six domino half-tile images first."
    )

model = YOLO("yolo11n.pt")  # pretrained generic detector, fine-tuned on our labels
model.train(
    data=str(DATA),
    epochs=80,
    imgsz=640,
    batch=8,
    patience=15,
    project=str(ROOT / "ai-training" / "runs"),
    name="domino-double-six",
)
