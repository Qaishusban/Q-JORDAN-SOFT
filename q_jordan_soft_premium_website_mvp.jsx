import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Code2,
  Crown,
  Database,
  Globe2,
 ([stackmatix.com](https://www.stackmatix.com/blog/saas-landing-page-examples?utm_source=chatgpt.com)),
  MessageSquareQuote,
  MonitorSmartphone,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const initialProjects = [
  {
    title: "Smart School Bus",
    category: "Mobile App + Admin Dashboard",
    status: "Ready for Demo",
    desc: "نظام ذكي لتتبع الباصات، إشعارات فورية، صلاحيات متعددة، ولوحات إدارة للمدرسة.",
    icon: MonitorSmartphone,
  },
  {
    title: "Pharma Ordering System",
    category: "B2B Ordering Platform",
    status: "In Development",
    desc: "منصة طلب أدوية للصيدليات والمصانع مع تتبع الطلبات والفواتير وصلاحيات الأدمن.",
    icon: Database,
  },
  {
    title: "Business Website Builder",
    category: "Corporate Website",
    status: "New",
    desc: "مواقع شركات حديثة بواجهة فخمة، نماذج تواصل، SEO وتجهيز كامل للنشر.",
    icon: Globe2,
  },
];

const services = [
  [Code2, "Custom Software", "أنظمة مخصصة حسب طبيعة عملك، من الفكرة حتى النشر."],
  [MonitorSmartphone, "Mobile Applications", "تطبيقات Android و iOS بواجهات عصرية وربط قواعد بيانات."],
  [LayoutDashboard, "Admin Dashboards", "لوحات تحكم لإدارة العملاء، الطلبات، المنتجات، والإشعارات."],
  [BellRing, "Smart Notifications", "إشعارات داخلية وخارجية للعملاء والموظفين حسب الصلاحيات."],
  [ShieldCheck, "Secure Access", "تسجيل دخول وصلاحيات Admin / Client / Staff بطريقة منظمة."],
  [Database, "Supabase Backend", "تخزين آمن للبيانات، جداول منظمة، Auth، وRealtime عند الحاجة."],
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur">
      <Sparkles className="h-4 w-4" /> {children}
    </span>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="text-3xl font-black text-zinc-950">{value}</div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  const Icon = project.icon;
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 220 }}>
      <Card className="group overflow-hidden rounded-[2rem] border-white/70 bg-white/80 shadow-xl shadow-orange-100/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-300 text-white shadow-lg shadow-orange-200">
              <Icon className="h-7 w-7" />
            </div>
            <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-bold text-white">{project.status}</span>
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-orange-600">{project.category}</p>
          <h3 className="mt-2 text-2xl font-black text-zinc-950">{project.title}</h3>
          <p className="mt-3 min-h-20 leading-7 text-zinc-600">{project.desc}</p>
          <button className="mt-5 inline-flex items-center gap-2 font-bold text-zinc-950 transition group-hover:text-orange-600">
            View details <ChevronRight className="h-4 w-4" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function QJordanSoftPremiumWebsite() {
  const [view, setView] = useState("home");
  const [projects, setProjects] = useState(initialProjects);
  const [quotes, setQuotes] = useState([
    { name: "Ahmad Pharmacy", email: "client@email.com", phone: "+962 79 000 0000", type: "Mobile App", budget: "1500 - 3000 JOD" },
  ]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Website", budget: "", message: "" });

  const stats = useMemo(
    () => [
      [projects.length + "+", "Showcase Projects"],
      [quotes.length, "Quote Requests"],
      ["24/7", "Digital Presence"],
    ],
    [projects.length, quotes.length]
  );

  const submitQuote = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setQuotes([{ ...form }, ...quotes]);
    setForm({ name: "", email: "", phone: "", type: "Website", budget: "", message: "" });
    setView("admin");
  };

  const addDemoProject = () => {
    setProjects([
      {
        title: "Client Portal System",
        category: "Web Platform",
        status: "Added by Admin",
        desc: "بوابة عملاء لعرض الإعلانات المستقبلية، الطلبات، العروض، والتنبيهات الخاصة بكل عميل.",
        icon: Users,
      },
      ...projects,
    ]);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fff8ef] text-zinc-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={() => setView("home")} className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-950 text-amber-300 shadow-lg">
              <Crown className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black leading-5">Q JORDAN SOFT</div>
              <div className="text-xs font-semibold text-zinc-500">Premium Software Studio</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/70 p-1 shadow-sm md:flex">
            {[
              ["home", "Home"],
              ["quote", "Request Quote"],
              ["client", "Client Portal"],
              ["admin", "Admin"]
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${view === key ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-orange-100"}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <Button onClick={() => setView("quote")} className="rounded-full bg-gradient-to-r from-zinc-950 to-zinc-800 px-5 py-6 text-white shadow-xl shadow-orange-200 hover:from-orange-600 hover:to-amber-500">
            Start Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {view === "home" && (
        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:py-16">
          <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Badge>Modern websites, apps & business systems</Badge>
              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-zinc-950 md:text-7xl">
                Software that makes your clients say
                <span className="block bg-gradient-to-r from-orange-600 to-amber-400 bg-clip-text text-transparent"> “واو… هذا احترافي.”</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-zinc-600">
                نبني مواقع، تطبيقات، ولوحات تحكم فخمة للشركات. العميل يدخل، يشوف شغلك، يطلب عرض سعر، وتوصلك البيانات مباشرة على Supabase ولوحة الأدمن.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => setView("quote")} className="rounded-full bg-orange-600 px-8 py-7 text-base font-black text-white shadow-xl shadow-orange-200 hover:bg-orange-700">
                  اطلب عرض سعر الآن <MessageSquareQuote className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" onClick={() => setView("admin")} className="rounded-full border-zinc-300 bg-white/70 px-8 py-7 text-base font-black">
                  Preview Admin <LockKeyhole className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                {stats.map(([value, label]) => <Stat key={label} value={value} label={label} />)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-orange-300/40 to-white blur-2xl" />
              <Card className="relative overflow-hidden rounded-[3rem] border-white/80 bg-zinc-950 text-white shadow-2xl shadow-orange-200">
                <CardContent className="p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-amber-300">LIVE BUSINESS COMMAND</p>
                      <h2 className="mt-2 text-3xl font-black">Quote & Project Center</h2>
                    </div>
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                      <BarChart3 className="h-7 w-7 text-amber-300" />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {["Client submits quote", "Admin reviews request", "Project added to showcase", "Future announcements sent"].map((x, i) => (
                      <div key={x} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-300 font-black text-zinc-950">{i + 1}</div>
                        <div className="font-bold">{x}</div>
                        <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-300" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[2rem] bg-gradient-to-r from-orange-500 to-amber-300 p-5 text-zinc-950">
                    <div className="flex items-center gap-3">
                      <Rocket className="h-7 w-7" />
                      <div>
                        <div className="text-xl font-black">Ready for GitHub + Supabase</div>
                        <div className="text-sm font-semibold opacity-80">Next step: database schema, auth, and deployment.</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          <section className="mt-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-black uppercase tracking-widest text-orange-600">Services</p>
                <h2 className="mt-2 text-4xl font-black">Everything your client needs to trust you</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map(([Icon, title, desc]) => (
                <Card key={title} className="rounded-[2rem] border-white/80 bg-white/75 shadow-lg shadow-orange-100/40 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-orange-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-black">{title}</h3>
                    <p className="mt-3 leading-7 text-zinc-600">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-black uppercase tracking-widest text-orange-600">Portfolio</p>
                <h2 className="mt-2 text-4xl font-black">Applications & systems showcase</h2>
              </div>
              <Button onClick={() => setView("quote")} className="hidden rounded-full bg-zinc-950 px-6 py-6 text-white md:inline-flex">Get a Quote</Button>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
            </div>
          </section>
        </main>
      )}

      {view === "quote" && (
        <main className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Badge>Fast quote request</Badge>
            <h1 className="mt-6 text-5xl font-black leading-tight">خلّي العميل يطلب عرض سعر بدون تسجيل دخول</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">نموذج بسيط، فخم، وقليل الخانات. لاحقًا سنربطه مباشرة بجدول quote_requests في Supabase.</p>
            <div className="mt-8 space-y-3">
              {["No login required", "Saved to Supabase", "Admin gets instant dashboard view"].map((x) => (
                <div key={x} className="flex items-center gap-3 font-bold"><CheckCircle2 className="h-5 w-5 text-orange-600" /> {x}</div>
              ))}
            </div>
          </div>

          <Card className="rounded-[2.5rem] border-white/80 bg-white/85 shadow-2xl shadow-orange-100 backdrop-blur">
            <CardContent className="p-7">
              <form onSubmit={submitQuote} className="grid gap-4">
                {[
                  ["name", "Full name / Company name"],
                  ["email", "Email address"],
                  ["phone", "Phone number"],
                  ["budget", "Expected budget"],
                ].map(([key, label]) => (
                  <label key={key} className="grid gap-2 text-sm font-black text-zinc-700">
                    {label}
                    <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="rounded-2xl border border-orange-100 bg-white px-5 py-4 outline-none ring-orange-300 transition focus:ring-4" />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-black text-zinc-700">
                  Project type
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-2xl border border-orange-100 bg-white px-5 py-4 outline-none ring-orange-300 transition focus:ring-4">
                    <option>Website</option>
                    <option>Mobile App</option>
                    <option>Dashboard</option>
                    <option>Full System</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-black text-zinc-700">
                  Tell us about your idea
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="rounded-2xl border border-orange-100 bg-white px-5 py-4 outline-none ring-orange-300 transition focus:ring-4" />
                </label>
                <Button className="mt-2 rounded-2xl bg-orange-600 py-7 text-lg font-black text-white shadow-xl shadow-orange-200 hover:bg-orange-700">
                  Submit Quote Request <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      )}

      {view === "client" && (
        <main className="relative z-10 mx-auto max-w-6xl px-5 py-14">
          <Badge>Client portal preview</Badge>
          <h1 className="mt-6 text-5xl font-black">بوابة العميل المستقبلية</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">هنا العميل بعد تعريفه من الأدمن يقدر يشوف الإعلانات المستقبلية، حالة طلبه، عروضه، ورسائل الشركة الخاصة فيه.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {["Announcements", "My Quotes", "Project Updates"].map((x, i) => (
              <Card key={x} className="rounded-[2rem] border-white/80 bg-white/80 shadow-xl shadow-orange-100">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-orange-600" />
                  <h3 className="mt-5 text-2xl font-black">{x}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{i === 0 ? "رسائل وتحديثات من الأدمن للعميل." : i === 1 ? "عرض طلبات عروض الأسعار السابقة." : "متابعة مراحل تنفيذ المشروع."}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {view === "admin" && (
        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Badge>Admin dashboard preview</Badge>
              <h1 className="mt-6 text-5xl font-black">لوحة تحكم Q JORDAN SOFT</h1>
              <p className="mt-4 text-zinc-600">واجهة مبدئية لإدارة المشاريع، العملاء، طلبات عروض الأسعار، والإعلانات.</p>
            </div>
            <Button onClick={addDemoProject} className="rounded-full bg-zinc-950 px-6 py-6 text-white">
              <Plus className="mr-2 h-5 w-5" /> Add Demo Project
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Stat value={projects.length} label="Projects" />
            <Stat value={quotes.length} label="Quote Requests" />
            <Stat value="12" label="Clients" />
            <Stat value="3" label="Announcements" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.9fr]">
            <Card className="rounded-[2.5rem] border-white/80 bg-white/85 shadow-xl shadow-orange-100 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-2xl font-black">Latest Quote Requests</h2>
                <div className="mt-5 space-y-3">
                  {quotes.map((q, i) => (
                    <div key={`${q.email}-${i}`} className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-black">{q.name}</div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-700">{q.type}</span>
                      </div>
                      <div className="mt-2 text-sm text-zinc-600">{q.email} • {q.phone}</div>
                      <div className="mt-2 font-bold text-zinc-800">Budget: {q.budget || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-white/80 bg-zinc-950 text-white shadow-2xl shadow-orange-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-black">Next Supabase Tables</h2>
                <div className="mt-5 space-y-3">
                  {["profiles", "projects", "quote_requests", "clients", "announcements", "admin_activity_logs"].map((table) => (
                    <div key={table} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Database className="h-5 w-5 text-amber-300" />
                      <span className="font-bold">{table}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </div>
  );
}
