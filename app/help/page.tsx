import { redirect } from "next/navigation"

/** Help index page - redirects to Quick Start */
export default function HelpPage() {
  redirect("/help/quick-start")
}
