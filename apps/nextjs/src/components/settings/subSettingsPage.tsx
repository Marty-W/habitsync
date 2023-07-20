interface Props {
  title: string
  children: React.ReactNode
}
const SubSettingsPage = ({ title, children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col px-4 pt-3">
      <h1 className="text-accent-foreground my-5 text-center text-xl">
        {title}
      </h1>
      {children}
    </div>
  )
}

export default SubSettingsPage
