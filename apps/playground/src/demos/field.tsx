import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function FieldDemo() {
  return (
    <form className="w-80" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-name">Full name</FieldLabel>
            <Input id="field-name" placeholder="Jane Doe" />
            <FieldDescription>Shown on your public profile.</FieldDescription>
          </Field>
          <Field data-invalid="true">
            <FieldLabel htmlFor="field-username">Username</FieldLabel>
            <Input id="field-username" aria-invalid defaultValue="jd" />
            <FieldError>Username must be at least 3 characters.</FieldError>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldLabel htmlFor="field-public">Public profile</FieldLabel>
            <Switch id="field-public" defaultChecked />
          </Field>
          <Field orientation="horizontal">
            <Checkbox defaultChecked>Email me about product updates</Checkbox>
          </Field>
          <Button type="submit" className="self-end">
            Save
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
