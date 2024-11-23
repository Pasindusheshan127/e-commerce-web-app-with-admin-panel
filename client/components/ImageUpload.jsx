"use client";
import React, { useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

const ImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
  acceptedTypes = ["image/png", "image/jpeg", "image/jpg"],
  maxFileSize = 2 * 1024 * 1024, // 2MB
  dragAndDropText = "Drag & drop or click to upload image",
}) => {
  const inputRef = useRef(null);

  // Handle file selection from input
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (!acceptedTypes.includes(selectedFile.type)) {
        alert(
          "Unsupported file type. Please upload an image (PNG, JPEG, JPG)."
        );
        return;
      }

      if (selectedFile.size > maxFileSize) {
        alert(
          `File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`
        );
        return;
      }

      setImageFile(selectedFile);
    }
  };

  // Handle drag-and-drop functionality
  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.style.borderColor = "#4a90e2"; // Add visual feedback
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.style.borderColor = ""; // Reset border color
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      if (!acceptedTypes.includes(droppedFile.type)) {
        alert(
          "Unsupported file type. Please upload an image (PNG, JPEG, JPG)."
        );
        return;
      }

      if (droppedFile.size > maxFileSize) {
        alert(
          `File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`
        );
        return;
      }

      setImageFile(droppedFile);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border border-dashed rounded-lg p-4 hover:border-blue-500 transition-colors"
      >
        {/* Hidden file input */}
        <Input
          id="image-upload"
          type="file"
          accept={acceptedTypes.join(", ")}
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          // Drag-and-Drop or File Selection Area
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-center">{dragAndDropText}</span>
          </Label>
        ) : (
          // File Details and Remove Button
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
