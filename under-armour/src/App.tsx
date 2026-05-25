import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { AuthProvider } from "@/context/auth-context";
import { PageSkeleton } from "@/components/skeletons";
import ErrorBoundary from "@/components/error-boundary";

const HomePage = lazy(() => import("@/pages/home"));
const MenPage = lazy(() => import("@/pages/men"));
const WomenPage = lazy(() => import("@/pages/women"));
const ShoesPage = lazy(() => import("@/pages/shoes"));
const KidsPage = lazy(() => import("@/pages/kids"));
const AccessoriesPage = lazy(() => import("@/pages/accessories"));
const SalePage = lazy(() => import("@/pages/sale"));
const NewArrivalsPage = lazy(() => import("@/pages/new-arrivals"));
const TrackOrderPage = lazy(() => import("@/pages/track-order"));
const SportsPage = lazy(() => import("@/pages/sports/index"));
const BasketballPage = lazy(() => import("@/pages/sports/basketball"));
const FootballPage = lazy(() => import("@/pages/sports/football"));
const GolfPage = lazy(() => import("@/pages/sports/golf"));
const RunningPage = lazy(() => import("@/pages/sports/running"));
const TrainingPage = lazy(() => import("@/pages/sports/training"));
const AccountPage = lazy(() => import("@/pages/account/index"));
const AccountSettingsPage = lazy(() => import("@/pages/account/settings"));
const AccountOrdersPage = lazy(() => import("@/pages/account/orders"));
const AccountWishlistPage = lazy(() => import("@/pages/account/wishlist"));
const CheckoutPage = lazy(() => import("@/pages/checkout/index"));
const CheckoutSuccessPage = lazy(() => import("@/pages/checkout/success"));
const ProductDetailPage = lazy(() => import("@/pages/product/detail"));
const ContactPage = lazy(() => import("@/pages/support/contact"));
const FaqPage = lazy(() => import("@/pages/support/faq"));
const ReturnsPage = lazy(() => import("@/pages/support/returns"));
const ShippingPage = lazy(() => import("@/pages/support/shipping"));
const SizeGuidePage = lazy(() => import("@/pages/support/size-guide"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/men" component={MenPage} />
        <Route path="/women" component={WomenPage} />
        <Route path="/shoes" component={ShoesPage} />
        <Route path="/kids" component={KidsPage} />
        <Route path="/accessories" component={AccessoriesPage} />
        <Route path="/sale" component={SalePage} />
        <Route path="/new-arrivals" component={NewArrivalsPage} />
        <Route path="/track-order" component={TrackOrderPage} />
        <Route path="/sports" component={SportsPage} />
        <Route path="/sports/basketball" component={BasketballPage} />
        <Route path="/sports/football" component={FootballPage} />
        <Route path="/sports/golf" component={GolfPage} />
        <Route path="/sports/running" component={RunningPage} />
        <Route path="/sports/training" component={TrainingPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/account/settings" component={AccountSettingsPage} />
        <Route path="/account/orders" component={AccountOrdersPage} />
        <Route path="/account/wishlist" component={AccountWishlistPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/checkout/success" component={CheckoutSuccessPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/support/contact" component={ContactPage} />
        <Route path="/support/faq" component={FaqPage} />
        <Route path="/support/returns" component={ReturnsPage} />
        <Route path="/support/shipping" component={ShippingPage} />
        <Route path="/support/size-guide" component={SizeGuidePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                  <ErrorBoundary>
                    <Router />
                  </ErrorBoundary>
                </WouterRouter>
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
