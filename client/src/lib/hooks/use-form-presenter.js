"use client"

import { useState, useCallback } from "react"

export function useFormPresenter(initialValues) {
  const [fields, setFields] = useState(() => {
    const initialFields = {}
    Object.keys(initialValues).forEach((key) => {
      initialFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false,
      }
    })
    return initialFields
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if form is valid
  const isValid = Object.values(fields).every((field) => !field.error)

  // Set field value
  const setFieldValue = useCallback((field, value) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null, // Clear error when value changes
      },
    }))
  }, [])

  // Set field error
  const setFieldError = useCallback((field, error) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error,
      },
    }))
  }, [])

  // Touch field
  const touchField = useCallback((field) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        touched: true,
      },
    }))
  }, [])

  // Validate single field
  const validateField = useCallback(
    (field, validators) => {
      const value = fields[field].value
      let error = null

      for (const validator of validators) {
        error = validator(value)
        if (error) break
      }

      setFieldError(field, error)
    },
    [fields, setFieldError],
  )

  // Validate entire form
  const validateForm = useCallback(
    (validators) => {
      let formIsValid = true

      Object.keys(validators).forEach((key) => {
        const field = key
        const fieldValidators = validators[field]
        const value = fields[field].value
        let error = null

        for (const validator of fieldValidators) {
          error = validator(value)
          if (error) break
        }

        if (error) {
          formIsValid = false
        }

        setFieldError(field, error)
      })

      return formIsValid
    },
    [fields, setFieldError],
  )

  // Reset form
  const resetForm = useCallback(() => {
    setFields(() => {
      const resetFields = {}
      Object.keys(initialValues).forEach((key) => {
        resetFields[key] = {
          value: initialValues[key],
          error: null,
          touched: false,
        }
      })
      return resetFields
    })
    setIsSubmitting(false)
  }, [initialValues])

  // Get field props for easy binding
  const getFieldProps = useCallback(
    (field) => ({
      value: fields[field].value,
      onChange: (value) => setFieldValue(field, value),
      onBlur: () => touchField(field),
      error: fields[field].touched ? fields[field].error : null,
    }),
    [fields, setFieldValue, touchField],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true)

      try {
        // Touch all fields to show validation errors
        Object.keys(fields).forEach((key) => {
          touchField(key)
        })

        if (isValid) {
          const values = {}
          Object.keys(fields).forEach((key) => {
            values[key] = fields[key].value
          })

          await onSubmit(values)
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [fields, isValid, touchField],
  )

  return {
    fields,
    isValid,
    isSubmitting,
    setFieldValue,
    setFieldError,
    touchField,
    validateField,
    validateForm,
    resetForm,
    getFieldProps,
    handleSubmit,
  }
}
