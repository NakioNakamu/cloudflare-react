import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
const profilePhotoKey = "profile.jpeg";

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/resume", async (c) => {
	const resume = await c.env.documents.get("resume.pdf");

	if (!resume) {
		return c.text("Resume not found", 404);
	}

	const headers = new Headers();
	resume.writeHttpMetadata(headers);
	headers.set("Content-Type", "application/pdf");
	headers.set("Content-Disposition", 'inline; filename="Nathan-Nakamura-Resume.pdf"');
	headers.set("Cache-Control", "public, max-age=3600");
	headers.set("ETag", resume.httpEtag);

	return new Response(resume.body, { headers });
});

app.get("/profile-photo", async (c) => {
	const photo = await c.env.photos.get(profilePhotoKey);

	if (!photo) {
		return c.text("Profile photo not found", 404);
	}

	const headers = new Headers();
	photo.writeHttpMetadata(headers);
	headers.set("Content-Type", "image/jpeg");
	headers.set("Cache-Control", "public, max-age=86400");
	headers.set("ETag", photo.httpEtag);

	return new Response(photo.body, { headers });
});

export default app;
