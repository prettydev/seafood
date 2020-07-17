import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import GlobalStyle from "../../global-styles";
import Layout from "../../components/Layout";
import { CallAll } from "../../actions";
import { Suspense } from "react";
import LoadingSpinner from "../../components/LoadingWrapper";
import _ from "lodash";

const HomePage = lazy(() => import("../HomePage"));
const RecipeDetailPage = lazy(() => import("../RecipeDetailPage"));
const SelectedSpeciesPage = lazy(() => import("../SelectedSpeciesPage"));
const SpeciesPage = lazy(() => import("../Species"));
const ExpertsPage = lazy(() => import("../ExpertsPage"));
const CreateAccount = lazy(() => import("../CreateAccount"));
const LoginToAccountEmail = lazy(() => import("../LoginToAccountEmail"));
const LoginToAccountSocial = lazy(() => import("../LoginToAccountSocial"));
const JoinOptions = lazy(() => import("../JoinOptions"));
const SearchResults = lazy(() => import("../SearchResults"));
const CustomPage = lazy(() => import("../CustomPage"));
const SponsoredBlogPost = lazy(() => import("../SponsoredBlogPost"));
const NotFoundPage = lazy(() => import("../NotFoundPage/Loadable"));
const RecieveAuthPage = lazy(() => import("../RecieveAuthPage"));
const LikedPage = lazy(() => import("../LikedPage"));
const EditProfile = lazy(() => import("../EditProfile"));
const ContactPage = lazy(() => import("../ContactPage"));
const SelectedExpertPage = lazy(() => import("../SelectedExpertPage"));
const SponsorsPage = lazy(() => import("../Sponsors"));

function App() {
  CallAll();

  return (
    <div className="body-wrapper">
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/recipe/:slug" component={RecipeDetailPage} />
            <Route path="/post/:slug" component={SponsoredBlogPost} />
            <Route path="/page/:slug" component={CustomPage} />
            <Route
              path="/species/:selectedSpecies"
              component={SelectedSpeciesPage}
            />
            <Route path="/species" component={SpeciesPage} />
            <Route path="/experts" component={ExpertsPage} />
            <Route path="/expert/:slug" component={SelectedExpertPage} />
            <Route path="/sign-in" component={LoginToAccountSocial} />
            <Route path="/sign-in-email" component={LoginToAccountEmail} />
            <Route path="/search-results" component={SearchResults} />
            <Route path="/auth/facebook/" component={RecieveAuthPage} />
            <Route path="/auth/google/" component={RecieveAuthPage} />
            <Route path="/join" component={JoinOptions} />{" "}
            <Route path="/email-signup" component={CreateAccount} />
            <Route path="/contact-us" component={ContactPage} />
            <Route path="/sponsors" component={SponsorsPage} />
            <PrivateRoute path="/liked-page" component={LikedPage} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </Suspense>
      <GlobalStyle />
    </div>
  );
}

function PrivateRoute({ path, component }) {
  const isLoggedIn = !_.isEmpty(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  return (
    <Route
      path={path}
      component={isLoggedIn && component}
      render={() =>
        !isLoggedIn && (
          <Redirect
            to={{
              pathname: "/join",
            }}
          />
        )
      }
    />
  );
}

export default App;
