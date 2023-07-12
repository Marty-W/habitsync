interface Props {
  title: string
  children: React.ReactNode
}
const SettingsSection = ({ title, children }: Props) => {
  return (
    <div className="mb-4">
      <h2 className="text-muted-foreground text-sm">{title.toUpperCase()}</h2>
      <div className="bg-card text-card-foreground divide-muted-foreground/5 grid grid-cols-1 divide-y-2 rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  )
}

export default SettingsSection
