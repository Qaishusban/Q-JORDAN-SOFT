import { useEffect, useState } from "react";
import {
  Code2,
  Briefcase,
  BarChart3,
  Boxes,
  Crown,
  Database,
  Download,
  Edit3,
  ImagePlus,
  Images,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  Gem,
  Globe2,
  Home,
  Info,
  Languages,
  Layers3,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  MonitorSmartphone,
  Phone,
  PlusCircle,
  Rocket,
  Send,
  ServerCog,
  Smartphone,
  Users,
  Shield,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { supabase } from "./supabaseClient";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);

  const [quotes, setQuotes] = useState([]);
  const [dbProjects, setDbProjects] = useState([]);
  const [dbServices, setDbServices] = useState([]);
  const [dbPackages, setDbPackages] = useState([]);
  const [footer, setFooter] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("qjs_theme") || "light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [screenshotForm, setScreenshotForm] = useState({
    project_id: "",
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    sort_order: 0,
    image: null,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [openAdminForm, setOpenAdminForm] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingPackageId, setEditingPackageId] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    project_type: "Website",
    message: "",
  });

  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });

  const emptyProject = {
    title_en: "",
    title_ar: "",
    category_en: "",
    category_ar: "",
    description_en: "",
    description_ar: "",
    details_en: "",
    details_ar: "",
    technologies_en: "",
    technologies_ar: "",
    features_en: "",
    features_ar: "",
    app_url: "",
    image: null,
  };

  const emptyService = {
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
  };

  const emptyPackage = {
    title_en: "",
    title_ar: "",
    price: "",
    description_en: "",
    description_ar: "",
    features_en: "",
    features_ar: "",
  };

  const emptyFooter = {
    phone: "",
    email: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    address_en: "",
    address_ar: "",
  };

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [packageForm, setPackageForm] = useState(emptyPackage);
  const [footerForm, setFooterForm] = useState(emptyFooter);

  const isAr = lang === "ar";

  const t = {
    en: {
      studio: "Premium Software Studio",
      navHome: "Home",
      navQuote: "Request Quote",
      navAdmin: "Admin",
      navServices: "Services",
      navPortfolio: "Portfolio",
      navAbout: "About",
      navContact: "Contact",
      badge: "Modern Software Solutions",
      heroTitle: "Premium Software Solutions",
      heroWow: "Built for Real Business Growth",
      heroText:
        "Welcome to Q Jordan Soft. We design and build modern websites, mobile apps, dashboards, and complete business systems that are elegant, reliable, and ready to scale.",
      quoteBtn: "Request Quote",
      adminBtn: "Admin Dashboard",
      command: "Business Command Center",
      quoteRequests: "Quote Requests",
      totalQuoteRequests: "Total quote requests",
      projects: "Projects",
      activeProjects: "Active projects",
      clients: "Clients",
      registeredClients: "Registered clients",
      servicesTitle: "What We Can Do For You",
      servicesKicker: "OUR SERVICES",
      portfolioBadge: "Our Work",
      portfolioTitle: "Applications & Systems Showcase",
      portfolioText: "Examples of systems and applications presented professionally.",
      viewProject: "View Project",
      close: "Close",
      technologies: "Technologies",
      features: "Features",
      projectDetails: "Project Details",
      contactUs: "Request Similar Project",
      downloadApp: "Download App",
      packagesTitle: "Service Packages",
      packagesText: "Professional offers prepared for your next digital project.",
      whyBadge: "WHY Q JORDAN SOFT",
      whyTitle: "Why Clients Trust Our Systems",
      whyText:
        "We do not just build a website. We build an experience that impresses clients from the first second.",
      quotePageBadge: "Request Quote",
      quotePageTitle: "Submit your project request and let Q JORDAN SOFT craft a complete digital experience that combines modern design, high performance, and scalability to turn your idea into a successful professional project.",
      quotePageText: "",
      name: "Full Name / Company Name",
      email: "Email",
      phone: "Phone Number",
      idea: "Tell us about your project",
      submit: "Submit Quote Request",
      adminTitle: "Admin Dashboard",
      adminText: "",
      password: "Password",
      adminLogin: "Admin Login",
      logout: "Logout",
      invalidLogin: "Invalid login details",
      noQuotes: "No quote requests yet.",
      addProject: "Project",
      addService: "Service",
      addPackage: "Offer Package",
      editFooter: "Footer & Contact",
      save: "Save",
      update: "Update",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      status: "Status",
      statusNew: "New",
      statusContacted: "Contacted",
      statusApproved: "Approved",
      statusRejected: "Rejected",
      projectTitleEn: "Project Title - English",
      projectTitleAr: "Project Title - Arabic",
      projectCategoryEn: "Category - English",
      projectCategoryAr: "Category - Arabic",
      projectDescriptionEn: "Short Description - English",
      projectDescriptionAr: "Short Description - Arabic",
      projectDetailsEn: "Project Details - English",
      projectDetailsAr: "Project Details - Arabic",
      projectTechnologiesEn: "Technologies - English, comma separated",
      projectTechnologiesAr: "Technologies - Arabic, comma separated",
      projectFeaturesEn: "Features - English, comma separated",
      projectFeaturesAr: "Features - Arabic, comma separated",
      appUrl: "App Download URL",
      serviceTitleEn: "Service Title - English",
      serviceTitleAr: "Service Title - Arabic",
      serviceDescriptionEn: "Service Description - English",
      serviceDescriptionAr: "Service Description - Arabic",
      packageTitleEn: "Package Title - English",
      packageTitleAr: "Package Title - Arabic",
      packagePrice: "Package Price",
      packageDescriptionEn: "Package Description - English",
      packageDescriptionAr: "Package Description - Arabic",
      packageFeaturesEn: "Features - English, comma separated",
      packageFeaturesAr: "Features - Arabic, comma separated",
      quoteContact: "Contact",
      quoteProject: "Project",
      quoteMessage: "Message",
      callClient: "Call",
      emailClient: "Email",
      footerPhone: "Phone",
      footerEmail: "Email",
      footerWhatsapp: "WhatsApp",
      footerFacebook: "Facebook",
      footerInstagram: "Instagram",
      footerLinkedin: "LinkedIn",
      footerAddressEn: "Address - English",
      footerAddressAr: "Address - Arabic",
      rights: "© 2026 Q JORDAN SOFT — All Rights Reserved",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      addScreenshots: "Project Screenshots",
      screenshotsTitle: "Project Screenshots",
      screenshotsText: "A visual tour that explains the main screens and features inside the system.",
      noScreenshots: "No screenshots added yet.",
      selectProject: "Select Project",
      screenshotTitleEn: "Screenshot Title - English",
      screenshotTitleAr: "Screenshot Title - Arabic",
      screenshotDescriptionEn: "Screenshot Description - English",
      screenshotDescriptionAr: "Screenshot Description - Arabic",
      screenshotOrder: "Display Order",
      screenshotImage: "Screenshot Image",
      uploadScreenshot: "Upload Screenshot",
      deleteScreenshot: "Delete Screenshot",
    },
    ar: {
      studio: "استوديو برمجي احترافي",
      navHome: "الرئيسية",
      navQuote: "طلب عرض سعر",
      navAdmin: "الأدمن",
      navServices: "الخدمات",
      navPortfolio: "الأعمال",
      navAbout: "من نحن",
      navContact: "تواصل معنا",
      badge: "حلول برمجية عصرية",
      heroTitle: "حلول برمجية احترافية",
      heroWow: "مصممة لنمو أعمالك بثقة",
      heroText:
        "مرحبًا بك في Q Jordan Soft. نصمّم ونطوّر مواقع إلكترونية، تطبيقات موبايل، لوحات تحكم، وأنظمة أعمال متكاملة بشكل أنيق وموثوق وقابل للتوسع.",
      quoteBtn: "اطلب عرض سعر",
      adminBtn: "لوحة الأدمن",
      command: "مركز إدارة الأعمال",
      quoteRequests: "طلبات عروض الأسعار",
      totalQuoteRequests: "إجمالي طلبات العروض",
      projects: "المشاريع",
      activeProjects: "مشاريع فعالة",
      clients: "العملاء",
      registeredClients: "عملاء مسجلين",
      servicesTitle: "ماذا يمكننا أن نقدم لك",
      servicesKicker: "خدماتنا",
      portfolioBadge: "أعمالنا",
      portfolioTitle: "عرض التطبيقات والأنظمة",
      portfolioText: "نماذج من الأنظمة والتطبيقات التي يمكن عرضها للعملاء بشكل احترافي.",
      viewProject: "عرض المشروع",
      close: "إغلاق",
      technologies: "التقنيات المستخدمة",
      features: "مميزات المشروع",
      projectDetails: "تفاصيل المشروع",
      contactUs: "اطلب مشروع مشابه",
      downloadApp: "تحميل التطبيق",
      packagesTitle: "عروض وباقات الخدمات",
      packagesText: "عروض احترافية جاهزة لمشروعك الرقمي القادم.",
      whyBadge: "لماذا Q JORDAN SOFT",
      whyTitle: "لماذا يثق العملاء بأنظمتنا",
      whyText: "نحن لا نبني مجرد موقع، نحن نبني تجربة تخلي العميل ينبهر من أول ثانية.",
      quotePageBadge: "طلب عرض سعر",
      quotePageTitle: "قدّم طلب مشروعك ودع فريق Q JORDAN SOFT يطوّر لك تجربة رقمية متكاملة تجمع بين التصميم العصري، الأداء العالي، وقابلية التوسع، لنساعدك على تحويل فكرتك إلى مشروع ناجح ومميز.",
      quotePageText: "",
      name: "الاسم الكامل / اسم الشركة",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      idea: "احكيلنا عن فكرة مشروعك",
      submit: "إرسال طلب عرض السعر",
      adminTitle: "لوحة تحكم الأدمن",
      adminText: "",
      password: "كلمة المرور",
      adminLogin: "دخول الأدمن",
      logout: "تسجيل خروج",
      invalidLogin: "بيانات الدخول غير صحيحة",
      noQuotes: "لا يوجد طلبات عرض سعر حتى الآن.",
      addProject: "مشروع",
      addService: "خدمة",
      addPackage: "عرض / باقة",
      editFooter: "الفوتر والتواصل",
      save: "حفظ",
      update: "تعديل",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      status: "الحالة",
      statusNew: "جديد",
      statusContacted: "تم التواصل",
      statusApproved: "مقبول",
      statusRejected: "مرفوض",
      projectTitleEn: "اسم المشروع بالإنجليزي",
      projectTitleAr: "اسم المشروع بالعربي",
      projectCategoryEn: "تصنيف المشروع بالإنجليزي",
      projectCategoryAr: "تصنيف المشروع بالعربي",
      projectDescriptionEn: "وصف مختصر بالإنجليزي",
      projectDescriptionAr: "وصف مختصر بالعربي",
      projectDetailsEn: "تفاصيل المشروع بالإنجليزي",
      projectDetailsAr: "تفاصيل المشروع بالعربي",
      projectTechnologiesEn: "التقنيات بالإنجليزي مفصولة بفاصلة",
      projectTechnologiesAr: "التقنيات بالعربي مفصولة بفاصلة",
      projectFeaturesEn: "المميزات بالإنجليزي مفصولة بفاصلة",
      projectFeaturesAr: "المميزات بالعربي مفصولة بفاصلة",
      appUrl: "رابط تحميل التطبيق",
      serviceTitleEn: "اسم الخدمة بالإنجليزي",
      serviceTitleAr: "اسم الخدمة بالعربي",
      serviceDescriptionEn: "وصف الخدمة بالإنجليزي",
      serviceDescriptionAr: "وصف الخدمة بالعربي",
      packageTitleEn: "اسم الباقة بالإنجليزي",
      packageTitleAr: "اسم الباقة بالعربي",
      packagePrice: "سعر الباقة",
      packageDescriptionEn: "وصف الباقة بالإنجليزي",
      packageDescriptionAr: "وصف الباقة بالعربي",
      packageFeaturesEn: "مميزات الباقة بالإنجليزي مفصولة بفاصلة",
      packageFeaturesAr: "مميزات الباقة بالعربي مفصولة بفاصلة",
      quoteContact: "التواصل",
      quoteProject: "المشروع",
      quoteMessage: "الرسالة",
      callClient: "اتصال",
      emailClient: "إيميل",
      footerPhone: "رقم الهاتف",
      footerEmail: "الإيميل",
      footerWhatsapp: "واتساب",
      footerFacebook: "فيسبوك",
      footerInstagram: "إنستغرام",
      footerLinkedin: "لينكدإن",
      footerAddressEn: "العنوان بالإنجليزي",
      footerAddressAr: "العنوان بالعربي",
      rights: "© 2026 Q JORDAN SOFT — جميع الحقوق محفوظة",
      darkMode: "الوضع الداكن",
      lightMode: "الوضع الفاتح",
      addScreenshots: "صور شرح المشروع",
      screenshotsTitle: "صور وشاشات المشروع",
      screenshotsText: "جولة مرئية توضّح أهم الشاشات والمميزات داخل النظام.",
      noScreenshots: "لا توجد صور مضافة حتى الآن.",
      selectProject: "اختر المشروع",
      screenshotTitleEn: "عنوان الصورة بالإنجليزي",
      screenshotTitleAr: "عنوان الصورة بالعربي",
      screenshotDescriptionEn: "وصف الصورة بالإنجليزي",
      screenshotDescriptionAr: "وصف الصورة بالعربي",
      screenshotOrder: "ترتيب العرض",
      screenshotImage: "صورة الشاشة",
      uploadScreenshot: "رفع الصورة",
      deleteScreenshot: "حذف الصورة",
    },
  };

  const content = t[lang];

  const splitList = (value) =>
    (value || "").split(",").map((item) => item.trim()).filter(Boolean);

  const getText = (item, base) => {
    if (!item) return "";
    if (isAr) return item[`${base}_ar`] || item[base] || item[`${base}_en`] || "";
    return item[`${base}_en`] || item[base] || item[`${base}_ar`] || "";
  };

  const getList = (item, base) => {
    if (!item) return [];
    if (isAr) return item[`${base}_ar`] || item[base] || item[`${base}_en`] || [];
    return item[`${base}_en`] || item[base] || item[`${base}_ar`] || [];
  };

  const fetchQuotes = async () => {
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setQuotes(data || []);
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDbProjects(data || []);
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDbServices(data || []);
  };

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDbPackages(data || []);
  };

  const fetchFooter = async () => {
    const { data } = await supabase
      .from("footer_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (data) {
      setFooter(data);
      setFooterForm({
        phone: data.phone || "",
        email: data.email || "",
        whatsapp: data.whatsapp || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        linkedin: data.linkedin || "",
        address_en: data.address_en || "",
        address_ar: data.address_ar || "",
      });
    }
  };

  const fetchScreenshots = async (projectId) => {
    if (!projectId) {
      setScreenshots([]);
      return;
    }

    const { data, error } = await supabase
      .from("project_screenshots")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (!error) setScreenshots(data || []);
  };


  useEffect(() => {
    localStorage.setItem("qjs_theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchPackages();
    fetchFooter();

    const savedAdmin = localStorage.getItem("qjs_admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
      fetchQuotes();
    }
  }, []);

  const submitQuote = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.phone) {
      alert(isAr ? "يرجى تعبئة الحقول المطلوبة" : "Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("quote_requests").insert([
        {
          ...formData,
          status: "new",
        },
      ]);

      if (error) throw error;

      alert(isAr ? "تم إرسال طلب عرض السعر بنجاح" : "Quote request submitted successfully");
      setFormData({ full_name: "", email: "", phone: "", project_type: "Website", message: "" });
      fetchQuotes();
    } catch (err) {
      alert(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id, status) => {
    const { error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchQuotes();
  };

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", adminLogin.email)
        .eq("password", adminLogin.password)
        .single();

      if (error || !data) {
        alert(content.invalidLogin);
        return;
      }

      setAdmin(data);
      localStorage.setItem("qjs_admin", JSON.stringify(data));
      fetchQuotes();
      fetchProjects();
      fetchServices();
      fetchPackages();
      fetchFooter();
    } catch {
      alert(content.invalidLogin);
    } finally {
      setLoading(false);
    }
  };

  const uploadProjectImage = async () => {
    if (!projectForm.image) return "";
    const fileExt = projectForm.image.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("projects-1")
      .upload(fileName, projectForm.image);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("projects-1").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const uploadScreenshotImage = async () => {
    if (!screenshotForm.image) return "";
    const fileExt = screenshotForm.image.name.split(".").pop();
    const fileName = `${screenshotForm.project_id}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("project-screenshots")
      .upload(fileName, screenshotForm.image);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("project-screenshots").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const saveScreenshot = async (e) => {
    e.preventDefault();

    if (!screenshotForm.project_id || !screenshotForm.image) {
      alert(isAr ? "يرجى اختيار المشروع والصورة" : "Please select a project and an image");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadScreenshotImage();

      const payload = {
        project_id: screenshotForm.project_id,
        image_url: imageUrl,
        title_en: screenshotForm.title_en,
        title_ar: screenshotForm.title_ar,
        description_en: screenshotForm.description_en,
        description_ar: screenshotForm.description_ar,
        sort_order: Number(screenshotForm.sort_order || 0),
      };

      const { error } = await supabase.from("project_screenshots").insert([payload]);
      if (error) throw error;

      setScreenshotForm({
        project_id: screenshotForm.project_id,
        title_en: "",
        title_ar: "",
        description_en: "",
        description_ar: "",
        sort_order: 0,
        image: null,
      });

      fetchScreenshots(screenshotForm.project_id);
      alert(isAr ? "تم رفع صورة الشرح بنجاح" : "Screenshot uploaded successfully");
    } catch (err) {
      alert(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteScreenshot = async (id, projectId) => {
    if (!confirm(isAr ? "هل تريد حذف هذه الصورة؟" : "Delete this screenshot?")) return;

    const { error } = await supabase.from("project_screenshots").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchScreenshots(projectId);
  };


  const saveProject = async (e) => {
    e.preventDefault();

    if (!projectForm.title_en || !projectForm.title_ar) {
      alert(isAr ? "يرجى إدخال اسم المشروع باللغتين" : "Please enter project title in both languages");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadProjectImage();

      const payload = {
        title: projectForm.title_en,
        category: projectForm.category_en,
        description: projectForm.description_en,
        title_en: projectForm.title_en,
        title_ar: projectForm.title_ar,
        category_en: projectForm.category_en,
        category_ar: projectForm.category_ar,
        description_en: projectForm.description_en,
        description_ar: projectForm.description_ar,
        details_en: projectForm.details_en,
        details_ar: projectForm.details_ar,
        technologies_en: projectForm.technologies_en,
        technologies_ar: projectForm.technologies_ar,
        features_en: splitList(projectForm.features_en),
        features_ar: splitList(projectForm.features_ar),
        app_url: projectForm.app_url,
      };

      if (imageUrl) payload.image_url = imageUrl;

      const query = editingProjectId
        ? supabase.from("projects").update(payload).eq("id", editingProjectId)
        : supabase.from("projects").insert([payload]);

      const { error } = await query;
      if (error) throw error;

      setProjectForm(emptyProject);
      setEditingProjectId(null);
      setOpenAdminForm("");
      fetchProjects();
    } catch (err) {
      alert(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveService = async (e) => {
    e.preventDefault();

    if (!serviceForm.title_en || !serviceForm.title_ar) {
      alert(isAr ? "يرجى إدخال اسم الخدمة باللغتين" : "Please enter service title in both languages");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: serviceForm.title_en,
        description: serviceForm.description_en,
        title_en: serviceForm.title_en,
        title_ar: serviceForm.title_ar,
        description_en: serviceForm.description_en,
        description_ar: serviceForm.description_ar,
      };

      const query = editingServiceId
        ? supabase.from("services").update(payload).eq("id", editingServiceId)
        : supabase.from("services").insert([payload]);

      const { error } = await query;
      if (error) throw error;

      setServiceForm(emptyService);
      setEditingServiceId(null);
      setOpenAdminForm("");
      fetchServices();
    } catch (err) {
      alert(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const savePackage = async (e) => {
    e.preventDefault();

    if (!packageForm.title_en || !packageForm.title_ar || !packageForm.price) {
      alert(isAr ? "يرجى إدخال اسم الباقة باللغتين والسعر" : "Please enter package title in both languages and price");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: packageForm.title_en,
        price: packageForm.price,
        description: packageForm.description_en,
        features: splitList(packageForm.features_en),
        title_en: packageForm.title_en,
        title_ar: packageForm.title_ar,
        description_en: packageForm.description_en,
        description_ar: packageForm.description_ar,
        features_en: splitList(packageForm.features_en),
        features_ar: splitList(packageForm.features_ar),
      };

      const query = editingPackageId
        ? supabase.from("packages").update(payload).eq("id", editingPackageId)
        : supabase.from("packages").insert([payload]);

      const { error } = await query;
      if (error) throw error;

      setPackageForm(emptyPackage);
      setEditingPackageId(null);
      setOpenAdminForm("");
      fetchPackages();
    } catch (err) {
      alert(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveFooter = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase
        .from("footer_settings")
        .upsert([{ id: 1, ...footerForm, updated_at: new Date().toISOString() }]);

      if (error) throw error;

      setOpenAdminForm("");
      fetchFooter();
    } catch (err) {
      alert(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = async (table, id, refresh) => {
    if (!confirm(isAr ? "هل أنت متأكد من الحذف؟" : "Are you sure you want to delete?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    refresh();
  };

  const editProject = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title_en: project.title_en || project.title || "",
      title_ar: project.title_ar || "",
      category_en: project.category_en || project.category || "",
      category_ar: project.category_ar || "",
      description_en: project.description_en || project.description || "",
      description_ar: project.description_ar || "",
      details_en: project.details_en || "",
      details_ar: project.details_ar || "",
      technologies_en: project.technologies_en || "",
      technologies_ar: project.technologies_ar || "",
      features_en: (project.features_en || project.features || []).join(", "),
      features_ar: (project.features_ar || []).join(", "),
      app_url: project.app_url || "",
      image: null,
    });
    setOpenAdminForm("project");
  };

  const editService = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title_en: service.title_en || service.title || "",
      title_ar: service.title_ar || "",
      description_en: service.description_en || service.description || "",
      description_ar: service.description_ar || "",
    });
    setOpenAdminForm("service");
  };

  const editPackage = (pkg) => {
    setEditingPackageId(pkg.id);
    setPackageForm({
      title_en: pkg.title_en || pkg.title || "",
      title_ar: pkg.title_ar || "",
      price: pkg.price || "",
      description_en: pkg.description_en || pkg.description || "",
      description_ar: pkg.description_ar || "",
      features_en: (pkg.features_en || pkg.features || []).join(", "),
      features_ar: (pkg.features_ar || []).join(", "),
    });
    setOpenAdminForm("package");
  };

  const defaultServices = [
    {
      icon: Code2,
      title_en: "Custom Software",
      title_ar: "برمجة أنظمة خاصة",
      description_en: "Custom software systems built around your business needs.",
      description_ar: "أنظمة برمجية مخصصة حسب طبيعة عملك.",
    },
    {
      icon: MonitorSmartphone,
      title_en: "Mobile Apps",
      title_ar: "تطبيقات موبايل",
      description_en: "Modern Android and iOS applications with premium UI.",
      description_ar: "تطبيقات Android و iOS بتصميم احترافي.",
    },
    {
      icon: LayoutDashboard,
      title_en: "Admin Dashboards",
      title_ar: "لوحات تحكم",
      description_en: "Dashboards to manage clients, orders, and content.",
      description_ar: "لوحات تحكم لإدارة العملاء والطلبات والمحتوى.",
    },
  ];

  const fallbackProjects = [
    {
      icon: MonitorSmartphone,
      tag: isAr ? "نسخة جاهزة" : "Ready Demo",
      title_en: "Smart School Bus",
      title_ar: "تطبيق الباص المدرسي الذكي",
      category_en: "Ready Demo",
      category_ar: "نسخة جاهزة",
      description_en: "School bus tracking app with notifications, roles, and live maps.",
      description_ar: "تطبيق تتبع باصات المدارس مع إشعارات فورية، صلاحيات، وخرائط مباشرة.",
      details_en: "A full smart transportation platform for schools.",
      details_ar: "منصة نقل ذكية كاملة للمدارس.",
      technologies_en: "React Native, Supabase, Maps, Notifications",
      technologies_ar: "React Native, Supabase, خرائط, إشعارات",
      features_en: ["Live tracking", "Push notifications", "Admin dashboard"],
      features_ar: ["تتبع مباشر", "إشعارات فورية", "لوحة تحكم"],
    },
    {
      icon: Database,
      tag: isAr ? "نظام أعمال" : "Business System",
      title_en: "Pharma Ordering System",
      title_ar: "نظام طلبات الأدوية",
      category_en: "Business System",
      category_ar: "نظام أعمال",
      description_en: "Medicine ordering system with invoices, tracking, and approvals.",
      description_ar: "نظام طلبات أدوية للصيدليات والمصانع مع فواتير وتتبع وموافقات.",
      details_en: "A B2B ordering and approval system for pharmacies and factories.",
      details_ar: "نظام طلبات وموافقات بين الصيدليات والمصانع.",
      technologies_en: "React, Supabase, Dashboard",
      technologies_ar: "React, Supabase, لوحة تحكم",
      features_en: ["Orders", "Invoices", "Approvals"],
      features_ar: ["طلبات", "فواتير", "موافقات"],
    },
  ];

  const displayProjects = dbProjects.length > 0 ? dbProjects : fallbackProjects;
  const displayServices = dbServices.length > 0 ? dbServices : defaultServices;

  const whyItems = [
    {
      icon: Zap,
      title: isAr ? "أداء سريع" : "Fast Performance",
      text: isAr ? "أنظمة سريعة جدًا وتجربة استخدام سلسة وحديثة." : "Fast systems with a smooth and modern user experience.",
    },
    {
      icon: Gem,
      title: isAr ? "تصميم فاخر" : "Luxury UI Design",
      text: isAr ? "تصميم احترافي وفخم يعطي ثقة مباشرة للعميل." : "Premium visual design that builds instant client trust.",
    },
    {
      icon: Layers3,
      title: isAr ? "قابل للتوسع" : "Scalable Systems",
      text: isAr ? "جاهز للتوسع وإضافة أي ميزات مستقبلية بسهولة." : "Ready to grow and add future features easily.",
    },
    {
      icon: TrendingUp,
      title: isAr ? "نمو الأعمال" : "Business Growth",
      text: isAr ? "أنظمة تساعدك على زيادة العملاء وتنظيم العمل." : "Systems that help grow your clients and organize operations.",
    },
  ];

  const adminOpenButton = (key, label) => (
    <button className="adminPlusBtn" onClick={() => setOpenAdminForm(openAdminForm === key ? "" : key)}>
      <PlusCircle size={20} /> {label}
    </button>
  );

  const navigateToPage = (targetPage) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setPage("home");
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const navButton = (key, label, Icon) => (
    <button
      className={page === key ? "activeNav" : ""}
      onClick={() => navigateToPage(key)}
    >
      <Icon size={17} />
      {label}
    </button>
  );

  const navScrollButton = (sectionId, label, Icon) => (
    <button onClick={() => scrollToSection(sectionId)}>
      <Icon size={17} />
      {label}
    </button>
  );

  const openProjectModal = (project) => {
    setSelectedProject(project);
    if (project?.id) {
      fetchScreenshots(project.id);
    } else {
      setScreenshots([]);
    }
  };

  return (
    <div className={`site ${isAr ? "rtl" : "ltr"} theme-${theme}`} dir={isAr ? "rtl" : "ltr"}>
      <header className="navbar premiumNavbar">
        <div className="brand" onClick={() => navigateToPage("home")}>
          <div className="logo logoImageBox">
            <img src="/logo.png" alt="Q Jordan Soft Logo" />
          </div>
          <div>
            <h2>Q JORDAN SOFT</h2>
            <p>{content.studio}</p>
          </div>
        </div>

        <button
          className="mobileMenuBtn"
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`mainNav ${mobileMenuOpen ? "mobileOpen" : ""}`}>
          {navButton("home", content.navHome, Home)}
          {navButton("quote", content.navQuote, FileText)}
          {navScrollButton("services", content.navServices, Boxes)}
          {navScrollButton("portfolio", content.navPortfolio, Briefcase)}
          {navScrollButton("about", content.navAbout, Info)}
          {navScrollButton("contact", content.navContact, Phone)}
          {navButton("admin", content.navAdmin, Shield)}

          <button className="langBtn" onClick={() => { setLang(isAr ? "en" : "ar"); setMobileMenuOpen(false); }}>
            <Languages size={16} />
            {isAr ? "English" : "العربية"}
          </button>

          <button
            className="themeBtn"
            onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setMobileMenuOpen(false); }}
            title={theme === "dark" ? content.lightMode : content.darkMode}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? content.lightMode : content.darkMode}
          </button>
        </nav>
      </header>

      {page === "home" && (
        <>
          <section className="hero">
            <div className="heroText">
              <span className="badge">
                <Sparkles size={16} /> {content.badge}
              </span>
              <h1>
                {content.heroTitle}
                <span>{content.heroWow}</span>
              </h1>
              <p>{content.heroText}</p>
              <div className="actions">
                <button className="primary" onClick={() => navigateToPage("quote")}>
                  {content.quoteBtn}
                </button>
                <button className="secondary" onClick={() => navigateToPage("admin")}>
                  {content.adminBtn}
                </button>
              </div>
            </div>

            <div className="heroCard commandCard">
              <div className="commandTitle">
                <BarChart3 size={35} />
                <div>
                  <h3>{content.command}</h3>
                  <p>{isAr ? "نظرة مباشرة على الأداء" : "Real-time Overview"}</p>
                </div>
              </div>

              <div className="statLine orangeStat">
                <div className="statInfo">
                  <FileText size={28} />
                  <div>
                    <span>{content.quoteRequests}</span>
                    <small>{content.totalQuoteRequests}</small>
                  </div>
                </div>
                <strong>{quotes.length}</strong>
              </div>

              <div className="statLine blueStat">
                <div className="statInfo">
                  <Boxes size={28} />
                  <div>
                    <span>{content.projects}</span>
                    <small>{content.activeProjects}</small>
                  </div>
                </div>
                <strong>{displayProjects.length}</strong>
              </div>

              <div className="statLine greenStat">
                <div className="statInfo">
                  <Users size={28} />
                  <div>
                    <span>{content.clients}</span>
                    <small>{content.registeredClients}</small>
                  </div>
                </div>
                <strong>{quotes.length}</strong>
              </div>
            </div>
          </section>

          <section id="services" className="section servicesSection">
            <div className="sectionTitle compactTitle">
              <span>{content.servicesKicker}</span>
              <h2>{content.servicesTitle}</h2>
            </div>
            <div className="grid">
              {displayServices.map((item) => {
                const Icon = item.icon || Code2;
                return (
                  <div className="card" key={item.id || getText(item, "title")}>
                    <Icon size={32} />
                    <h3>{getText(item, "title")}</h3>
                    <p>{getText(item, "description")}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="portfolio" className="section portfolio">
            <div className="sectionTitle">
              <span className="badge">{content.portfolioBadge}</span>
              <h2>{content.portfolioTitle}</h2>
              <p>{content.portfolioText}</p>
            </div>

            <div className="grid">
              {displayProjects.map((project) => {
                const Icon = project.icon || Globe2;
                return (
                  <div className="projectCard" key={project.id || getText(project, "title")}>
                    {project.image_url && <img className="projectImage" src={project.image_url} alt={getText(project, "title")} />}
                    <div className="projectTop">
                      <Icon size={34} />
                      <span>{getText(project, "category") || project.tag || "Project"}</span>
                    </div>
                    <h3>{getText(project, "title")}</h3>
                    <p>{getText(project, "description")}</p>
                    <button onClick={() => openProjectModal(project)}>{content.viewProject}</button>
                  </div>
                );
              })}
            </div>
          </section>

          {dbPackages.length > 0 && (
            <section className="section offersSection">
              <div className="sectionTitle">
                <span className="badge">{content.packagesTitle}</span>
                <h2>{content.packagesTitle}</h2>
                <p>{content.packagesText}</p>
              </div>

              <div className="grid">
                {dbPackages.map((pkg) => (
                  <div className="packageCard packageCardPro" key={pkg.id}>
                    <span className="offerBadge">{isAr ? "عرض احترافي" : "Professional Offer"}</span>
                    <h3>{getText(pkg, "title")}</h3>
                    <h2>{pkg.price}</h2>
                    <p>{getText(pkg, "description")}</p>
                    <ul>
                      {getList(pkg, "features").map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                    <button onClick={() => navigateToPage("quote")}>{content.quoteBtn}</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section id="about" className="whySection">
            <div className="whyHeader">
              <span className="badge">{content.whyBadge}</span>
              <h2>{content.whyTitle}</h2>
              <p>{content.whyText}</p>
            </div>
            <div className="whyGrid">
              {whyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="whyCard" key={item.title}>
                    <Icon size={42} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <footer id="contact" className="footer">
            <div>
              <h2>Q JORDAN SOFT</h2>
              <p>{content.studio}</p>
              {(footer?.address_en || footer?.address_ar) && (
                <p>{isAr ? footer.address_ar : footer.address_en}</p>
              )}
            </div>

            <div className="footerLinks">
              {footer?.phone && <a href={`tel:${footer.phone}`}>Phone: {footer.phone}</a>}
              {footer?.email && <a href={`mailto:${footer.email}`}>Email: {footer.email}</a>}
              {footer?.whatsapp && <a href={footer.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}
              {footer?.facebook && <a href={footer.facebook} target="_blank" rel="noreferrer">Facebook</a>}
              {footer?.instagram && <a href={footer.instagram} target="_blank" rel="noreferrer">Instagram</a>}
              {footer?.linkedin && <a href={footer.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </div>

            <div className="footerBottom">{content.rights}</div>
          </footer>
        </>
      )}

      {page === "quote" && (
        <section className="formSection">
          <div>
            <span className="badge">
              <MessageSquareQuote size={16} /> {content.quotePageBadge}
            </span>
            <h1>{content.quotePageTitle}</h1>
            <p>{content.quotePageText}</p>
          </div>

          <form className="quoteForm" onSubmit={submitQuote}>
            <input placeholder={content.name} value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
            <input placeholder={content.email} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder={content.phone} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <select value={formData.project_type} onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}>
              <option>Website</option>
              <option>Mobile App</option>
              <option>Dashboard</option>
              <option>Full System</option>
            </select>
            <textarea placeholder={content.idea} rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            <button type="submit" disabled={loading}>
              {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : <><Send size={16} /> {content.submit}</>}
            </button>
          </form>
        </section>
      )}

      {page === "admin" && (
        <section className="formSection">
          {!admin ? (
            <>
              <div>
                <span className="badge">{content.adminTitle}</span>
                <h1>{content.adminLogin}</h1>
                <p>{content.adminText}</p>
              </div>

              <form className="quoteForm" onSubmit={loginAdmin}>
                <input placeholder={content.email} value={adminLogin.email} onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })} />
                <input type="password" placeholder={content.password} value={adminLogin.password} onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })} />
                <button type="submit" disabled={loading}>
                  {loading ? (isAr ? "جاري الدخول..." : "Logging in...") : content.adminLogin}
                </button>
              </form>
            </>
          ) : (
            <div className="adminPanel">
              <div className="adminHeader">
                <div>
                  <span className="badge">{content.adminTitle}</span>
                  <h1>{content.adminTitle}</h1>
                  <p className="adminText">{content.adminText}</p>
                </div>
                <button
                  className="secondary"
                  onClick={() => {
                    setAdmin(null);
                    setQuotes([]);
                    localStorage.removeItem("qjs_admin");
                  }}
                >
                  {content.logout}
                </button>
              </div>

              <div className="grid stats">
                <div className="card"><h2>{displayProjects.length}</h2><p>{content.projects}</p></div>
                <div className="card"><h2>{quotes.length}</h2><p>{content.quoteRequests}</p></div>
                <div className="card"><h2>{dbServices.length}</h2><p>{content.servicesTitle}</p></div>
              </div>

              <div className="adminActionsBar">
                {adminOpenButton("project", content.addProject)}
                {adminOpenButton("screenshots", content.addScreenshots)}
                {adminOpenButton("service", content.addService)}
                {adminOpenButton("package", content.addPackage)}
                {adminOpenButton("footer", content.editFooter)}
              </div>

              {openAdminForm === "project" && (
                <div className="addProjectBox">
                  <h2>{editingProjectId ? content.update : content.addProject}</h2>
                  <form className="quoteForm" onSubmit={saveProject}>
                    <input placeholder={content.projectTitleEn} value={projectForm.title_en} onChange={(e) => setProjectForm({ ...projectForm, title_en: e.target.value })} />
                    <input placeholder={content.projectTitleAr} value={projectForm.title_ar} onChange={(e) => setProjectForm({ ...projectForm, title_ar: e.target.value })} />
                    <input placeholder={content.projectCategoryEn} value={projectForm.category_en} onChange={(e) => setProjectForm({ ...projectForm, category_en: e.target.value })} />
                    <input placeholder={content.projectCategoryAr} value={projectForm.category_ar} onChange={(e) => setProjectForm({ ...projectForm, category_ar: e.target.value })} />
                    <textarea placeholder={content.projectDescriptionEn} rows="3" value={projectForm.description_en} onChange={(e) => setProjectForm({ ...projectForm, description_en: e.target.value })} />
                    <textarea placeholder={content.projectDescriptionAr} rows="3" value={projectForm.description_ar} onChange={(e) => setProjectForm({ ...projectForm, description_ar: e.target.value })} />
                    <textarea placeholder={content.projectDetailsEn} rows="4" value={projectForm.details_en} onChange={(e) => setProjectForm({ ...projectForm, details_en: e.target.value })} />
                    <textarea placeholder={content.projectDetailsAr} rows="4" value={projectForm.details_ar} onChange={(e) => setProjectForm({ ...projectForm, details_ar: e.target.value })} />
                    <input placeholder={content.projectTechnologiesEn} value={projectForm.technologies_en} onChange={(e) => setProjectForm({ ...projectForm, technologies_en: e.target.value })} />
                    <input placeholder={content.projectTechnologiesAr} value={projectForm.technologies_ar} onChange={(e) => setProjectForm({ ...projectForm, technologies_ar: e.target.value })} />
                    <textarea placeholder={content.projectFeaturesEn} rows="3" value={projectForm.features_en} onChange={(e) => setProjectForm({ ...projectForm, features_en: e.target.value })} />
                    <textarea placeholder={content.projectFeaturesAr} rows="3" value={projectForm.features_ar} onChange={(e) => setProjectForm({ ...projectForm, features_ar: e.target.value })} />
                    <input placeholder={content.appUrl} value={projectForm.app_url} onChange={(e) => setProjectForm({ ...projectForm, app_url: e.target.value })} />
                    <input type="file" accept="image/*" onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files[0] })} />
                    <button type="submit" disabled={loading}>{loading ? "..." : editingProjectId ? content.update : content.save}</button>
                  </form>
                </div>
              )}

              {openAdminForm === "screenshots" && (
                <div className="addProjectBox screenshotAdminBox">
                  <h2>{content.addScreenshots}</h2>
                  <form className="quoteForm" onSubmit={saveScreenshot}>
                    <select
                      value={screenshotForm.project_id}
                      onChange={(e) => {
                        setScreenshotForm({ ...screenshotForm, project_id: e.target.value });
                        fetchScreenshots(e.target.value);
                      }}
                    >
                      <option value="">{content.selectProject}</option>
                      {dbProjects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {getText(project, "title")}
                        </option>
                      ))}
                    </select>

                    <input placeholder={content.screenshotTitleEn} value={screenshotForm.title_en} onChange={(e) => setScreenshotForm({ ...screenshotForm, title_en: e.target.value })} />
                    <input placeholder={content.screenshotTitleAr} value={screenshotForm.title_ar} onChange={(e) => setScreenshotForm({ ...screenshotForm, title_ar: e.target.value })} />
                    <textarea placeholder={content.screenshotDescriptionEn} rows="3" value={screenshotForm.description_en} onChange={(e) => setScreenshotForm({ ...screenshotForm, description_en: e.target.value })} />
                    <textarea placeholder={content.screenshotDescriptionAr} rows="3" value={screenshotForm.description_ar} onChange={(e) => setScreenshotForm({ ...screenshotForm, description_ar: e.target.value })} />
                    <input type="number" placeholder={content.screenshotOrder} value={screenshotForm.sort_order} onChange={(e) => setScreenshotForm({ ...screenshotForm, sort_order: e.target.value })} />
                    <input type="file" accept="image/*" onChange={(e) => setScreenshotForm({ ...screenshotForm, image: e.target.files[0] })} />
                    <button type="submit" disabled={loading}>
                      {loading ? "..." : <><ImagePlus size={16} /> {content.uploadScreenshot}</>}
                    </button>
                  </form>

                  {screenshots.length > 0 && (
                    <div className="adminScreensPreview">
                      {screenshots.map((shot) => (
                        <div className="adminScreenItem" key={shot.id}>
                          <img src={shot.image_url} alt={getText(shot, "title") || "Screenshot"} />
                          <div>
                            <h4>{getText(shot, "title") || content.screenshotsTitle}</h4>
                            <p>{getText(shot, "description")}</p>
                            <button className="dangerMiniBtn" onClick={() => deleteScreenshot(shot.id, shot.project_id)}>
                              <Trash2 size={14} /> {content.deleteScreenshot}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {openAdminForm === "service" && (
                <div className="addProjectBox">
                  <h2>{editingServiceId ? content.update : content.addService}</h2>
                  <form className="quoteForm" onSubmit={saveService}>
                    <input placeholder={content.serviceTitleEn} value={serviceForm.title_en} onChange={(e) => setServiceForm({ ...serviceForm, title_en: e.target.value })} />
                    <input placeholder={content.serviceTitleAr} value={serviceForm.title_ar} onChange={(e) => setServiceForm({ ...serviceForm, title_ar: e.target.value })} />
                    <textarea placeholder={content.serviceDescriptionEn} rows="3" value={serviceForm.description_en} onChange={(e) => setServiceForm({ ...serviceForm, description_en: e.target.value })} />
                    <textarea placeholder={content.serviceDescriptionAr} rows="3" value={serviceForm.description_ar} onChange={(e) => setServiceForm({ ...serviceForm, description_ar: e.target.value })} />
                    <button type="submit" disabled={loading}>{loading ? "..." : editingServiceId ? content.update : content.save}</button>
                  </form>
                </div>
              )}

              {openAdminForm === "package" && (
                <div className="addProjectBox">
                  <h2>{editingPackageId ? content.update : content.addPackage}</h2>
                  <form className="quoteForm" onSubmit={savePackage}>
                    <input placeholder={content.packageTitleEn} value={packageForm.title_en} onChange={(e) => setPackageForm({ ...packageForm, title_en: e.target.value })} />
                    <input placeholder={content.packageTitleAr} value={packageForm.title_ar} onChange={(e) => setPackageForm({ ...packageForm, title_ar: e.target.value })} />
                    <input placeholder={content.packagePrice} value={packageForm.price} onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })} />
                    <textarea placeholder={content.packageDescriptionEn} rows="3" value={packageForm.description_en} onChange={(e) => setPackageForm({ ...packageForm, description_en: e.target.value })} />
                    <textarea placeholder={content.packageDescriptionAr} rows="3" value={packageForm.description_ar} onChange={(e) => setPackageForm({ ...packageForm, description_ar: e.target.value })} />
                    <textarea placeholder={content.packageFeaturesEn} rows="3" value={packageForm.features_en} onChange={(e) => setPackageForm({ ...packageForm, features_en: e.target.value })} />
                    <textarea placeholder={content.packageFeaturesAr} rows="3" value={packageForm.features_ar} onChange={(e) => setPackageForm({ ...packageForm, features_ar: e.target.value })} />
                    <button type="submit" disabled={loading}>{loading ? "..." : editingPackageId ? content.update : content.save}</button>
                  </form>
                </div>
              )}

              {openAdminForm === "footer" && (
                <div className="addProjectBox">
                  <h2>{content.editFooter}</h2>
                  <form className="quoteForm" onSubmit={saveFooter}>
                    <input placeholder={content.footerPhone} value={footerForm.phone} onChange={(e) => setFooterForm({ ...footerForm, phone: e.target.value })} />
                    <input placeholder={content.footerEmail} value={footerForm.email} onChange={(e) => setFooterForm({ ...footerForm, email: e.target.value })} />
                    <input placeholder={content.footerWhatsapp} value={footerForm.whatsapp} onChange={(e) => setFooterForm({ ...footerForm, whatsapp: e.target.value })} />
                    <input placeholder={content.footerFacebook} value={footerForm.facebook} onChange={(e) => setFooterForm({ ...footerForm, facebook: e.target.value })} />
                    <input placeholder={content.footerInstagram} value={footerForm.instagram} onChange={(e) => setFooterForm({ ...footerForm, instagram: e.target.value })} />
                    <input placeholder={content.footerLinkedin} value={footerForm.linkedin} onChange={(e) => setFooterForm({ ...footerForm, linkedin: e.target.value })} />
                    <input placeholder={content.footerAddressEn} value={footerForm.address_en} onChange={(e) => setFooterForm({ ...footerForm, address_en: e.target.value })} />
                    <input placeholder={content.footerAddressAr} value={footerForm.address_ar} onChange={(e) => setFooterForm({ ...footerForm, address_ar: e.target.value })} />
                    <button type="submit" disabled={loading}>{loading ? "..." : content.save}</button>
                  </form>
                </div>
              )}

              <div className="quotesSection">
                <h2>{content.projects}</h2>
                <div className="quotesGrid">
                  {dbProjects.map((project) => (
                    <div className="quoteCard" key={project.id}>
                      {project.image_url && <img className="projectImage" src={project.image_url} alt={getText(project, "title")} />}
                      <div className="quoteTop">
                        <h3>{getText(project, "title")}</h3>
                        <span>{getText(project, "category")}</span>
                      </div>
                      <div className="quoteMessage">{getText(project, "description")}</div>
                      <div className="quoteActions">
                        <button className="secondary smallAction" onClick={() => editProject(project)}><Edit3 size={15} /> {content.edit}</button>
                        <button
                          className="secondary smallAction"
                          onClick={() => {
                            setOpenAdminForm("screenshots");
                            setScreenshotForm({ ...screenshotForm, project_id: project.id });
                            fetchScreenshots(project.id);
                          }}
                        >
                          <Images size={15} /> {content.addScreenshots}
                        </button>
                        <button className="primary smallAction" onClick={() => deleteRow("projects", project.id, fetchProjects)}><Trash2 size={15} /> {content.delete}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quotesSection">
                <h2>{content.servicesTitle}</h2>
                <div className="quotesGrid">
                  {dbServices.map((service) => (
                    <div className="quoteCard" key={service.id}>
                      <div className="quoteTop"><h3>{getText(service, "title")}</h3></div>
                      <div className="quoteMessage">{getText(service, "description")}</div>
                      <div className="quoteActions">
                        <button className="secondary smallAction" onClick={() => editService(service)}><Edit3 size={15} /> {content.edit}</button>
                        <button className="primary smallAction" onClick={() => deleteRow("services", service.id, fetchServices)}><Trash2 size={15} /> {content.delete}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quotesSection">
                <h2>{content.packagesTitle}</h2>
                <div className="quotesGrid">
                  {dbPackages.map((pkg) => (
                    <div className="quoteCard" key={pkg.id}>
                      <div className="quoteTop"><h3>{getText(pkg, "title")}</h3><span>{pkg.price}</span></div>
                      <div className="quoteMessage">{getText(pkg, "description")}</div>
                      <div className="quoteActions">
                        <button className="secondary smallAction" onClick={() => editPackage(pkg)}><Edit3 size={15} /> {content.edit}</button>
                        <button className="primary smallAction" onClick={() => deleteRow("packages", pkg.id, fetchPackages)}><Trash2 size={15} /> {content.delete}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quotesSection">
                <h2>{content.quoteRequests}</h2>
                {quotes.length === 0 ? (
                  <div className="quoteEmpty">{content.noQuotes}</div>
                ) : (
                  <div className="quotesGrid">
                    {quotes.map((quote) => (
                      <div className={`quoteCard quoteCardPremium quoteStatus-${quote.status || "new"}`} key={quote.id}>
                        <div className="quoteTop">
                          <h3>{quote.full_name}</h3>
                          <span>{quote.created_at ? new Date(quote.created_at).toLocaleDateString() : ""}</span>
                        </div>

                        <div className="quoteInfoGrid">
                          <div>
                            <small>{content.quoteContact}</small>
                            <p><Mail size={15} /> {quote.email}</p>
                            <p><Phone size={15} /> {quote.phone}</p>
                          </div>
                          <div>
                            <small>{content.quoteProject}</small>
                            <p>{quote.project_type}</p>
                          </div>
                        </div>

                        <div className="quoteMessage">
                          <strong>{content.quoteMessage}: </strong>
                          {quote.message || (isAr ? "لا توجد رسالة" : "No message")}
                        </div>

                        <div className="quoteActions">
                          <select
                            className="statusSelect"
                            value={quote.status || "new"}
                            onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                          >
                            <option value="new">{content.statusNew}</option>
                            <option value="contacted">{content.statusContacted}</option>
                            <option value="approved">{content.statusApproved}</option>
                            <option value="rejected">{content.statusRejected}</option>
                          </select>

                          <a className="primary smallAction" href={`tel:${quote.phone}`}>{content.callClient}</a>
                          <a className="secondary smallAction" href={`mailto:${quote.email}`}>{content.emailClient}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {selectedProject && (
        <div className="projectModalOverlay" onClick={() => setSelectedProject(null)}>
          <div className="projectModal" onClick={(e) => e.stopPropagation()}>
            {selectedProject.image_url && <img className="projectModalImage" src={selectedProject.image_url} alt={getText(selectedProject, "title")} />}

            <span className="badge">{getText(selectedProject, "category") || selectedProject.tag}</span>
            <h2>{getText(selectedProject, "title")}</h2>
            <p>{getText(selectedProject, "description")}</p>

            <div className="modalInfoGrid">
              <div>
                <h3>{content.projectDetails}</h3>
                <p>{getText(selectedProject, "details") || getText(selectedProject, "description")}</p>
              </div>
              <div>
                <h3>{content.technologies}</h3>
                <p>{getText(selectedProject, "technologies") || "React / Supabase / Dashboard / Storage"}</p>
              </div>
            </div>

            <div className="projectScreenshotsSection">
              <div className="galleryHeader">
                <span className="badge"><Images size={16} /> {content.screenshotsTitle}</span>
                <p>{content.screenshotsText}</p>
              </div>

              {screenshots.length === 0 ? (
                <div className="emptyGallery">{content.noScreenshots}</div>
              ) : (
                <div className="screenshotsGrid">
                  {screenshots.map((shot) => (
                    <div className="screenshotCard" key={shot.id}>
                      <img src={shot.image_url} alt={getText(shot, "title") || "Project screenshot"} />
                      <div className="screenshotContent">
                        <h3>{getText(shot, "title") || content.screenshotsTitle}</h3>
                        <p>{getText(shot, "description")}</p>
                        {admin && (
                          <button className="dangerMiniBtn" onClick={() => deleteScreenshot(shot.id, shot.project_id)}>
                            <Trash2 size={14} /> {content.deleteScreenshot}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modalFeaturesBox">
              <h3>{content.features}</h3>
              <ul>
                {getList(selectedProject, "features").length > 0 ? (
                  getList(selectedProject, "features").map((feature, index) => <li key={index}>✓ {feature}</li>)
                ) : (
                  <li>✓ {isAr ? "تصميم فخم وقابل للتوسع" : "Premium scalable design"}</li>
                )}
              </ul>
            </div>

            <div className="modalActions">
              {selectedProject.app_url && (
                <a className="primary smallAction" href={selectedProject.app_url} target="_blank" rel="noreferrer">
                  <Download size={16} /> {content.downloadApp}
                </a>
              )}
              <button className="primary" onClick={() => navigateToPage("quote")}>{content.contactUs}</button>
              <button className="secondary" onClick={() => setSelectedProject(null)}>{content.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}