import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
} from '@/components/ui/steps'

const steps = [
  { title: 'Account', description: 'Email & password', body: 'Create your account with a work email.' },
  { title: 'Workspace', description: 'Name & URL', body: 'Pick a name and a URL for your workspace.' },
  { title: 'Invite', description: 'Add teammates', body: 'Invite teammates by email, or skip for now.' },
]

export default function StepsDemo() {
  return (
    <Steps count={steps.length} defaultStep={1} className="w-[520px]">
      <StepsList>
        {steps.map((step, index) => (
          <StepsItem key={step.title} index={index} title={step.title} description={step.description} />
        ))}
      </StepsList>
      <div className="rounded-lg border border-border bg-card px-4 py-3">
        {steps.map((step, index) => (
          <StepsContent key={step.title} index={index}>
            {step.body}
          </StepsContent>
        ))}
        <StepsCompletedContent>🎉 You're all set.</StepsCompletedContent>
      </div>
      <div className="flex justify-end gap-1.5">
        <StepsPrevTrigger>Back</StepsPrevTrigger>
        <StepsNextTrigger>Continue</StepsNextTrigger>
      </div>
    </Steps>
  )
}
