module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const url = process.env.SUPABASE_URL || "https://fdtgsthycvfoftuvljxz.supabase.co";
  const key = process.env.SUPABASE_ANON_KEY || "sb_publishable_3kIlK-pegQtayaEClxcwJA_QuCpmhA3";
  if (!key) {
    res.status(500).json({ ok: false, error: "missing-key" });
    return;
  }
  try {
    const r = await fetch(url + "/rest/v1/messages?select=id&limit=1", {
      headers: { apikey: key, Authorization: "Bearer " + key },
    });
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status });
  } catch {
    res.status(502).json({ ok: false });
  }
};
