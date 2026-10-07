import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TerminalIcon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AlertDemo() {
  return (
    <div className="grid w-96 gap-2">
      <Alert>
        <TerminalIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Add components with the CLI.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>New version available</AlertTitle>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Changes saved</AlertTitle>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>You have used 92% of your workspace storage.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Please update your billing details.</AlertDescription>
      </Alert>
    </div>
  )
}
