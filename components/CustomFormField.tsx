import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { formFieldType } from "./forms/PatientForm";
import Image from "next/image";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { E164Number } from 'libphonenumber-js/core'
import { Select, SelectTrigger, SelectContent, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>,
  fieldType: formFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
  const { fieldType, placeholder, iconSrc, iconAlt, dateFormat, showTimeSelect, renderSkeleton } = props;

  switch (fieldType) {
    case formFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'Icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )

    case formFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea placeholder={placeholder} {...field} className="shad-textArea" disabled={props.disabled} />
        </FormControl>
      )

    case formFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )

    case formFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src='/assets/icons/calendar.svg'
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value || Date.now()}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"

            />
          </FormControl>
        </div>
      )

    case formFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case formFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )

    case formFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </Label>
          </div>
        </FormControl>
      )

    default:
      break;
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== formFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    >
    </FormField>
  )
}

export default CustomFormField
