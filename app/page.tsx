import DashboardLayout from "@/components/DashboardLayout";
import Filters from "@/components/Filters";
import { OverviewCard } from "@/components/OverviewCard";
import ProgressOverTime from "@/components/ProgressOverTime";
import LeadsSummary from "@/components/LeadsSummary";

export default function Page() {
  return (
    <DashboardLayout>
      <Filters />

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 sr-only">Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <OverviewCard
            title="People contacted"
            value="12000"
            icon="/overview.png"
          />
          <OverviewCard
            title="No of Leads Generated"
            value="48"
            icon="/leads.png"
          />
          <OverviewCard
            title="Sequence in progress"
            value="234"
            icon="/sequence.png"
          />
          <OverviewCard title="Lead rate" value="12%" icon="/lead.png" />
          <OverviewCard
            title="Sequence success rate"
            value="27%"
            icon="/ss.png"
          />
          <OverviewCard title="New Leads Today" value="56" icon="/leads.png" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProgressOverTime />
        <LeadsSummary />
      </div>
    </DashboardLayout>
  );
}
