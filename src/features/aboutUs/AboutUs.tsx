import SectionsWraper from "@/components/SectionWrapper";
import {
  contacts,
  mapUrl,
  teamMembers,
  missionStatement,
  additionalSections,
} from "./aboutUs.data";

// Reusable component for displaying section headers and content
const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="max-w-3xl mx-auto text-center my-10">
    <h3 className="text-3xl font-bold text-center mb-8">{title}</h3>
    <p className="text-lg text-neutral-500">{content}</p>
  </div>
);

const AboutUs = () => {
  return (
    <div>
      <SectionsWraper heading="About Us">
        <section className="mb-20">
          <Section
            title={additionalSections.companyHistory.title}
            content={additionalSections.companyHistory.content}
          />

          <div className="flex flex-col items-center content-center mb-12">
            <h3 className="text-3xl font-bold mb-8">Meet Our Team</h3>
            <div className="flex flex-col md:flex-row items-center content-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="m-6 px-4">
                  <div className="flex flex-col items-center">
                    <img
                      className="mb-4 h-40 w-40 rounded-full"
                      src={member.image}
                      alt={member.name}
                    />
                    <h4 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h4>
                    <p className="text-lg text-teal-700 mb-2">
                      {member.position}
                    </p>
                    <p className="text-neutral-500 text-center">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Section title="Mission Statement" content={missionStatement} />

          <Section
            title={additionalSections.ourFleet.title}
            content={additionalSections.ourFleet.content}
          />

          <Section
            title={additionalSections.valuesAndCommitment.title}
            content={additionalSections.valuesAndCommitment.content}
          />

          <h3 className="text-3xl font-bold text-center mb-8 mt-12">
            Our Location
          </h3>
          <div className="mb-12 flex items-center justify-center">
            <iframe
              title="Our Location"
              src={mapUrl}
              width="80%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>

          <h3 className="text-3xl font-bold text-center mb-8">Contact Us</h3>
          <div className="flex flex-col md:flex-row justify-center items-center content-center">
            {contacts.map((contact, index) => (
              <div key={index} className="m-4 flex flex-col items-center">
                <div className="bg-neutral-100 text-blue-500 rounded-full p-3 mb-4">
                  {contact.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{contact.title}</h4>
                <p className="text-lg text-neutral-500 mb-2">{contact.email}</p>
                <p className="text-lg text-neutral-500 mb-2">{contact.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </SectionsWraper>
    </div>
  );
};

export default AboutUs;
