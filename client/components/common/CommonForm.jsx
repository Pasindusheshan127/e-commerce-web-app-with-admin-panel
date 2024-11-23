"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls, // Array of control configurations (name, label, type, etc.)
  formData, // State object containing form values
  setFormData, // Function to update form data state
  onSubmit, // Callback for form submission
  buttonText, // Text for the submit button
}) => {
  /**
   * Renders form inputs based on the `componentType` provided.
   * @param {Object} control - The control configuration for the current input.
   * @returns {JSX.Element} The input component (Input, Select, or Textarea).
   */
  const renderInputsByComponentType = (control) => {
    // Extract current value from form data or default to undefined
    const value = formData[control.name] || undefined;

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type || "text"}
            value={value || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                [control.name]: event.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(selectedValue) =>
              setFormData({
                ...formData,
                [control.name]: selectedValue,
              })
            }
          >
            <SelectTrigger className="w-full bg-white text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border border-gray-300 rounded-md">
              {control.options && control.options.length > 0 ? (
                control.options.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    className="hover:bg-gray-100"
                  >
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No options available</SelectItem>
              )}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            value={value || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                [control.name]: event.target.value,
              })
            }
          />
        );

      default:
        // Default to an input field if componentType is unknown
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type || "text"}
            value={value || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                [control.name]: event.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* Render form controls dynamically */}
        <div className="flex flex-col gap-3">
          {formControls.map((control) => (
            <div key={control.name} className="grid w-full gap-1.5">
              {/* Display the label for the control */}
              <Label htmlFor={control.name} className="mb-1">
                {control.label}
              </Label>
              {/* Render input based on component type */}
              {renderInputsByComponentType(control)}
            </div>
          ))}
        </div>
        {/* Submit button */}
        <Button
          type="submit"
          className="mt-2 w-full bg-black text-white hover:bg-slate-400 hover:text-black"
        >
          {buttonText || "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CommonForm;
