import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import ShareButton from '../../components/common/ShareButton';
import womenEmpowermentOrgs, { womenEmpowermentSchemes } from '../../data/womenEmpowermentOrgs';

function CommunityHub() {
  const pageTitle = 'Women Empowerment';
  const pageSummary = 'Explore trusted organizations, schemes, and impact programs designed for women’s safety, financial security, and leadership.';

  const overviewCards = useMemo(
    () => [
      {
        label: 'Trusted organizations',
        value: womenEmpowermentOrgs.length,
        icon: Users,
        gradient: 'from-fuchsia-500 to-pink-500',
      },
      {
        label: 'Government schemes',
        value: womenEmpowermentSchemes.length,
        icon: ShieldCheck,
        gradient: 'from-cyan-500 to-blue-500',
      },
      {
        label: 'Support helpline',
        value: 181,
        icon: Phone,
        gradient: 'from-amber-500 to-orange-500',
      },
    ],
    [],
  );

  const focusAreas = useMemo(() => {
    const allAreas = womenEmpowermentOrgs.flatMap((org) => org.focusAreas || []);
    return Array.from(new Set(allAreas));
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://herguardian.ai/community';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-pink-100 bg-white/90 p-8 shadow-xl shadow-pink-200/20"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
                <Sparkles className="h-4 w-4" />
                Women Empowerment
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Empower women with trusted support, programs, and advocacy.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                {pageSummary} Discover legal support, financial schemes, grassroots NGOs, and practical resources built to uplift women across communities.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
              <ShareButton title={pageTitle} text={pageSummary} url={shareUrl} className="w-full" />
              <a
                href="mailto:support@herguardian.ai?subject=Women Empowerment Support"
                className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
              >
                <HeartHandshake className="mr-2 h-4 w-4" /> Contact Support
              </a>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-5 sm:grid-cols-3">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-[28px] border border-slate-200 bg-gradient-to-br ${card.gradient} p-6 text-white shadow-xl shadow-slate-200/20`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-sm uppercase tracking-[0.24em] text-white/80">{card.label}</p>
                <p className="mt-4 text-4xl font-bold">{card.value}</p>
              </motion.div>
            );
          })}
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/20">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured organizations</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Leading women empowerment partners</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span key={area} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {womenEmpowermentOrgs.map((org, idx) => (
              <motion.article
                key={org.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg"
              >
                <div className="flex flex-col gap-4 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
                      {org.logo ? <img src={org.logo} alt={`${org.name} logo`} className="h-10 w-10 object-contain" /> : <Users className="h-8 w-8 text-slate-500" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{org.name}</h3>
                      <p className="text-sm text-slate-500">{org.location}</p>
                    </div>
                  </div>
                  <p className="text-slate-600">{org.description}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Mission</p>
                      <p className="mt-2 text-sm text-slate-700">{org.mission}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Vision</p>
                      <p className="mt-2 text-sm text-slate-700">{org.vision}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {org.focusAreas?.map((area) => (
                      <span key={area} className="rounded-full bg-pink-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-700">
                        {area}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {org.services.slice(0, 3).map((service) => (
                      <p key={service} className="rounded-3xl bg-slate-100 p-3 text-sm text-slate-700">{service}</p>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Website
                    </a>
                    <a
                      href={`tel:${org.contact}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Phone className="mr-2 h-4 w-4" /> Call
                    </a>
                    <a
                      href={org.volunteerLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
                    >
                      Volunteer
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Support schemes</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Government-backed programs for women</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              <BookOpen className="h-4 w-4" /> Learn, apply, and access benefits
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {womenEmpowermentSchemes.map((scheme, idx) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex items-center gap-3 text-slate-900">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">{scheme.name}</h3>
                </div>
                <p className="mt-4 text-slate-600">{scheme.description}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {scheme.benefits.map((benefit) => (
                    <span key={benefit} className="rounded-full bg-white px-3 py-2 text-sm text-slate-700">
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={scheme.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Visit site
                  </a>
                  <a
                    href={`tel:${scheme.contact}`}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Contact helpline
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-slate-200 bg-gradient-to-r from-fuchsia-50 to-sky-50 p-8 shadow-xl shadow-slate-200/20"
        >
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">How to use this page</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Find support, apply quickly, and share your journey.</h2>
              <div className="mt-6 space-y-4 text-slate-600">
                <p>Browse verified organizations, view support services, and connect directly via website or helpline.</p>
                <p>Explore government schemes that offer safe housing, education savings, and rehabilitation services for women and girls.</p>
                <p>Use the share feature to spread trusted resources with your network.</p>
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-200/30">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-700">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Action steps</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Connect to support in minutes.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-600" />
                  Choose an organization that matches your need and location.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-600" />
                  Review scheme benefits and use direct links to apply.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-600" />
                  Share these trusted resources with your network.
                </li>
              </ul>
              <div className="mt-6">
                <ShareButton
                  title="Women Empowerment Support Resources"
                  text="Explore these trusted women empowerment organizations and government schemes to get immediate support."
                  url={shareUrl}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default CommunityHub;
