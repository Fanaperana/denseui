import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'

export default function PasswordInputDemo() {
  return (
    <div className="grid w-64 gap-1">
      <Label htmlFor="password">Password</Label>
      <PasswordInput id="password" placeholder="At least 12 characters" defaultValue="correct-horse-battery" />
    </div>
  )
}
