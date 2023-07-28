interface Props {
  options: string[]
  activeOption: string
  onToggleChange: (option: string) => void
}

const TabToggle = ({ options, onToggleChange, activeOption }: Props) => {
  return (
    <div className="flex justify-evenly">
      {options.map((option, index) => (
        <button
          key={`${option}_${index}`}
          onClick={() => onToggleChange(option)}
          className={`${
            activeOption === option ? "text-accent-focus font-bold" : ""
          }`}
        >
          <span>{option}</span>
        </button>
      ))}
    </div>
  )
}

export default TabToggle
