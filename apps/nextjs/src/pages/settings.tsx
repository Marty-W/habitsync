import type { NextPage } from "next"
import Link from "next/link"
import { signOut } from "next-auth/react"

import DeleteAccountItem from "~/components/settings/deleteAccountItem"
import SettingsItem from "~/components/settings/settingsItem"
import SettingsSection from "~/components/settings/settingsSection"

const Settings: NextPage = () => {
  return (
    <div className="cotainer flex h-screen min-h-screen flex-col px-4">
      <div className="my-5 flex h-1/5 flex-col justify-end">
        <h1 className="text-accent text-4xl">Settings</h1>
      </div>
      <SettingsSection title="Habits">
        <SettingsItem title="Sync new" as={Link} href="/settings/sync-new" />
        <SettingsItem
          title="Edit current"
          as={Link}
          href="/settings/edit-current"
        />
        <SettingsItem
          title="Delete timestamps"
          as={Link}
          href="/settings/delete-timestamps"
        />
      </SettingsSection>
      <SettingsSection title="Account">
        <SettingsItem
          title="Log out"
          as="button"
          onClick={() => signOut({ callbackUrl: "/" })}
        />
        <DeleteAccountItem />
      </SettingsSection>
      <SettingsSection title="App">
        <SettingsItem
          title="Hide detail sections"
          as={Link}
          href="/settings/edit-detail-section"
        />
        <SettingsItem title="Prefered theme" as="button" />
      </SettingsSection>
    </div>
  )
}

export default Settings
