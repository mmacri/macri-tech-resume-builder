
import React from 'react';

const ExperienceSection: React.FC = () => {
  return (
    <section className="resume-section" id="experience">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Experience</h2>

        {/* Experience Card 1 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Sr Manager, InfoSec Solution &amp; Automation Engineering</h3>
              <p className="text-macri-primary text-sm">Dec 2021 - Present</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">ServiceNow.com: Legal, Ethics &amp; Compliance Program</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Created PolicyHub – a self-service portal centralizing <span className="relative group">
                <b data-tooltip="Centralized over 400 compliance policies">400+ policies</b>
              </span> – to enable fast, secure access to critical compliance documentation and reduce training dependency.</li>
              <li>Enhanced product features in GRC, Policy &amp; Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.</li>
              <li>Collaborated with executives to resolve production vulnerabilities, mitigating <span className="relative group">
                <b data-tooltip="Mitigated revenue risk by resolving production vulnerabilities">$900M</b>
              </span> in annual revenue risk.</li>
              <li>Streamlined workflows and implemented common controls to reduce redundant operations and boost data transparency.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 2 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Partner Business Development &amp; Technical Alliance Director – GSI's Americas</h3>
              <p className="text-macri-primary text-sm">Nov 2019 - Dec 2021</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com: Global System Integrators Program (GSI/MSP Sales)</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Managed VMware's largest alliances with strategic system integrators, driving multi-hundred-million-dollar growth.</li>
              <li>Defined and executed joint business plans that delivered <span className="relative group">
                <b data-tooltip="Revenue increased by 644% in FY21 H1">644% revenue growth in FY21 H1</b>
              </span> and <span className="relative group">
                <b data-tooltip="Revenue increased by 466% in FY21 H2">466% in FY21 H2</b>
              </span>.</li>
              <li>Expanded the quarterly pipeline by <span className="relative group">
                <b data-tooltip="Quarterly pipeline expanded by 250%">250%</b>
              </span> through partnerships with DXC, Capgemini, and others.</li>
              <li>Awarded Partner Business Manager MVP and Regional Technical Alliance Manager of the Quarter on multiple occasions.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 3 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Partner Staff Solutions Engineer</h3>
              <p className="text-macri-primary text-sm">Dec 2017 - Dec 2019</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com: Channel Partner Engineering</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Partnered with CDW to drive <span className="relative group">
                <b data-tooltip="Generated $440M in multi-tiered routes-to-market revenue">$440M</b>
              </span> through multi-tiered routes-to-market.</li>
              <li>Delivered targeted SaaS and hybrid cloud campaigns that increased pipeline capture by <span className="relative group">
                <b data-tooltip="Pipeline capture increased by 20%">20%</b>
              </span>.</li>
              <li>Launched new upsell and cross-sell programs that resulted in a <span className="relative group">
                <b data-tooltip="Renewal revenue increased by 20%">20% revenue increase</b>
              </span> from renewals.</li>
              <li>Implemented technical enablement programs that boosted solution adoption by <span className="relative group">
                <b data-tooltip="Solution adoption increased by 20%">20%</b>
              </span>.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 4 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Sr Manager, Customer Success TAMs &amp; Product Specialists – West Coast Regional Practice</h3>
              <p className="text-macri-primary text-sm">Oct 2014 - Dec 2017</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com - Pre &amp; Post Sales Solutions</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Developed and branded customer success teams that increased solution adoption by <span className="relative group">
                <b data-tooltip="Solution adoption increased by 44%">44%</b>
              </span> and improved NPS by <span className="relative group">
                <b data-tooltip="NPS improved by 30 points">30 points</b>
              </span> (20 points above goal).</li>
              <li>Created customer success playbooks, account plans, and success metrics that were adopted nationally.</li>
              <li>Built Salesforce and Power BI dashboards to identify and track key customer success metrics.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 5 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Staff Technical Account Manager – Team Lead</h3>
              <p className="text-macri-primary text-sm">Dec 2011 - Nov 2014</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com - Technical Account Solutions</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Automated Costco's storefront deployment across <span className="relative group">
                <b data-tooltip="Deployment scaled to over 500 locations">500+ locations</b>
              </span>, reducing setup time from <span className="relative group">
                <b data-tooltip="Deployment time reduced from 4 hours">4 hours</b>
              </span> to <span className="relative group">
                <b data-tooltip="Deployment time reduced to 10 minutes">10 minutes</b>
              </span> and generating significant CAPEX/OPEX savings.</li>
              <li>Enabled Nike's adoption of VMware-integrated OpenStack solutions, enhancing operational efficiency and scalability.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 6 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Senior Systems Engineer – National Channel Partners Team</h3>
              <p className="text-macri-primary text-sm">May 2011 – Dec 2011</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">VMware</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Managed channel partner engagement and enablement plans that increased VMware demand by <span className="relative group">
                <b data-tooltip="Increased demand by $16.5M in realized revenue">$16.5M</b>
              </span> in realized revenue.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 7 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Group Manager / Lead Senior Consultant</h3>
              <p className="text-macri-primary text-sm">Jan 2007 – May 2011</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">ISOutsource</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Improved project efficiency and profit margins by <span className="relative group">
                <b data-tooltip="Efficiency improved by 14%">14%</b>
              </span> using pod-based frameworks.</li>
            </ul>
          </div>
        </div>

        {/* Experience Card 8 */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Entrepreneur / Managing Partner</h3>
              <p className="text-macri-primary text-sm">Nov 2002 – Dec 2006</p>
            </div>
            <h5 className="text-base font-normal text-gray-600 mb-3">Connecting Point</h5>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
              <li>Founded a professional services division that led to acquisition and rebranding as <b>Connecting Point of Indiana</b>.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
