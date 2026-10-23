# Download the public Domino 5 dataset from Roboflow Universe.
# Set ROBOFLOW_API_KEY in the environment; do not commit the key.
# Usage:
#   python -m pip install roboflow
#   ROBOFLOW_API_KEY=... python ai-training/download_dataset.py
from pathlib import Path
import os

from roboflow import Roboflow

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "dataset"

api_key = os.environ.get("ROBOFLOW_API_KEY")
if not api_key:
    raise SystemExit(
        "Missing ROBOFLOW_API_KEY. Create/use a Roboflow API key privately, "
        "then set it as an environment variable. Never commit the key."
    )

rf = Roboflow(api_key=api_key)
project = rf.workspace("proyect-train").project("domino-5")
# Public project page lists version 1 with 5,598 images.
version = project.version(1)
dataset = version.download("yolov8", location=str(DEST))

print(f"Dataset downloaded to: {dataset.location}")
print("Next: inspect the downloaded data.yaml and labels, then run ai-training/train.py.")
print("Check dataset license/attribution and confirm downloaded version/terms before redistribution.")
