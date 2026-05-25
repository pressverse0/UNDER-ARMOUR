import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";

import HomePage from "@/pages/home";
import MenPage from "@/pages/men";
import WomenPage from "@/pages/women";
import ShoesPage from "@/pages/shoes";
import KidsPage from "@/pages/kids";
import AccessoriesPage from "@/pages/accessories";
import SalePage from "@/pages/sale";
import NewArrivalsPage from "@/pages/new-arrivals";
import TrackOrderPage from "@/pages/track-order";
import SportsPage from "@/pages/sports/index";
import BasketballPage from "@/pages/sports/basketball";
import FootballPage from "@/pages/sports/football";
import GolfPage from "@/pages/sports/golf";
import RunningPage from "@/pages/sports/running";
import TrainingPage from "@/pages/sports/training";
import AccountPage from "@/pages/account/index";
import AccountSettingsPage from "@/pages/account/settings";
import AccountOrdersPage from "@/pages/account/orders";
import AccountWishlistPage from "@/pages/account/wishlist";
import CheckoutPage from "@/pages/checkout/index";
import CheckoutSuccessPage from "@/pages/checkout/success";
import ProductDetailPage from "@/pages/product/detail";
import ContactPage from "@/pages/support/contact";
import FaqPage from "@/pages/support/faq";
import ReturnsPage from "@/pages/support/returns";
import ShippingPage from "@/pages/support/shipping";
import SizeGuidePage from "@/pages/support/size-guide";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WishlistProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
