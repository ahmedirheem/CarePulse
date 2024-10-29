"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form"
import { createUser } from "@/lib/actions/patient.actions"
import { UserFormValidation } from "@/lib/validation"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { formFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"

import Image from "next/image"
import { SelectItem } from "../ui/select"
import FileUploader from "../FileUploader"

function RegisterForm({ user }: { user: User }) {
  const router = useRouter();




  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    console.log(user);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}`)
      }

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email address"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="+(555) 123-4567"
          />

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

          <CustomFormField
            fieldType={formFieldType.DATE_PICKER}
            control={form.control}
            name="dateBirth"
            label="Date of birth"
          />

          <CustomFormField
            fieldType={formFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                    </div>

                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="ex: 14 street, New York, NY-5101"
          />

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />


        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="emergency-phone"
            label="Emergency contact name"
            placeholder="Guardian's name"
          />

          <CustomFormField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="emergency-phone"
            label="Emergency phone number"
            placeholder="ex: +1 (868) 579-9831"
          />
        </div>

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="primary-physician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="insurance-provider"
            label="Insurance provider"
            placeholder="ex: BlueCross BlueShield"
          />

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="policy-number"
            label="Insurance policy number"
            placeholder="ex: ABC1234567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="ex: Peanuts, Penicillin, Pollen"
          />

          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="current-medications"
            label="Current medications"
            placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="family-medical-history-"
            label="Family medical history (if relevant)"
            placeholder="ex: Mother had breast cancer "
          />

          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="past-medical-history"
            label="Past medical history"
            placeholder="ex: Asthma diagnosis in childhood"
          />
        </div>

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="primary-physician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {IdentificationTypes.map((type, i) => (
            <SelectItem key={type + i} value={type} className="cursor-pointer">
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="identification-number"
          label="Identification Number"
          placeholder="ex: 123456789"
        />

        <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="identification-document"
          label="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          name="treatment-consent"
          label="I consent to receive treatment for my health condition."
        />

        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          name="disclosure-consent"
          label="I consent to the use and disclosure of my health information for treatment purposes."
        />

        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          name="privacy-consent"
          label="I acknowledge that I have reviewed and agree to the privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm;
