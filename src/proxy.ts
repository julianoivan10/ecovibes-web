import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Mendefinisikan rute mana saja yang dikunci (semua yang berawalan /admin)
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Jika rute dikunci, wajibkan pengguna untuk login
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Lewati file internal Next.js dan file statis
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Selalu jalankan middleware untuk rute API
    '/(api|trpc)(.*)',
  ],
};