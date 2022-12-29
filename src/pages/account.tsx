import { NextPage } from 'next'
import { useState } from 'react'
import { trpc } from 'lib/trpc'

const AccountPage: NextPage = () => {
  const { data: labelData, refetch: labelRefetch } =
    trpc.acc.getUserLabels.useQuery(undefined, { enabled: false })
  const { data: avatarUrl } = trpc.acc.getUserImgUrl.useQuery()
  //TODO fix old path
  const { mutate: fetchUserHabits } = trpc.habit.setUserHabits.useMutation()
  const [localLabel, setLocalLabel] = useState('')

  //TODO add some visual prompt to tell user to pick label before fetching habits
  // TODO add visual warning that it will delete all user habit data???

  return (
    <div className='flex min-h-screen w-full flex-col items-center p-4'>
      <div className='placeholder avatar'>
        <div className='w-24 rounded-full bg-neutral-focus text-neutral-content'>
          {avatarUrl ? (
            <img alt='user avatar' src={avatarUrl} />
          ) : (
            <span className='text-3xl'>MW</span>
          )}
        </div>
      </div>
      <div className='flex w-full flex-1 flex-col justify-center'>
        <div className='flex items-center justify-between'>
          <span>Habit label</span>
          {/* TODO Disable the sync all habits button until user picks a label */}
          <select
            className='select-primary select max-w-xs'
            disabled={!labelData}
            defaultValue='placeholder'
            onChange={(e) => setLocalLabel(e.currentTarget.value)}
          >
            <option value='placeholder'>Your habit label</option>
            {labelData?.map((label) => {
              return (
                <option key={label.id} value={label.name}>
                  {label.name}
                </option>
              )
            })}
          </select>
        </div>
        <button
          className='btn-outline btn-xs btn mt-3 border-red-400'
          onClick={() => labelRefetch()}
        >
          Sync labels
        </button>
        <button
          className='btn-outline btn-xs btn mt-3 border-red-400'
          onClick={() => fetchUserHabits({ labelName: localLabel })}
          disabled={!localLabel}
        >
          Sync all habits
        </button>
      </div>
    </div>
  )
}

export default AccountPage
