Create an Expo application

To get started using Clerk with Expo, create a new Expo project and install the necessary dependencies. See the Expo documentation for more information.
npm
yarn
pnpm
terminal

npx create-expo-app application-name --template blank && cd application-name
npx expo install react-dom react-native-web @expo/metro-runtime

Install @clerk/clerk-expo

Add Clerk's Expo SDK to your project:
npm
yarn
pnpm
terminal

npm install @clerk/clerk-expo

Set your environment variables

    Navigate to the Clerk Dashboard.
    In the navigation sidebar, select API Keys.
    In the Quick Copy section, copy your Clerk publishable and secret key.
    Paste your keys into your .env file.

The final result should resemble the following:
.env

EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY

Add <ClerkProvider> to your root layout

All Clerk hooks and components must be children of <ClerkProvider>, which provides active session and user context. Clerk also provides <ClerkLoaded>, which will not render child content unless the Clerk API has loaded.

To grant your entire app access to Clerk session data and ensure nothing renders until Clerk loads, add both components to your root layout as shown in the following example:
app/\_layout.tsx

import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'

export default function RootLayout() {
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
throw new Error(
'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
)
}

return (
<ClerkProvider publishableKey={publishableKey}>
<ClerkLoaded>
<Slot />
</ClerkLoaded>
</ClerkProvider>
)
}

Configure the Token Cache with Expo

The token cache is used to persist the active user's session token. Clerk stores this token in memory by default, however it is recommended to use a token cache for production applications.

Install expo-secure-store, which you'll use as your token cache:
npm
yarn
pnpm
terminal

npm install expo-secure-store

When configuring a custom token cache, you must create an object that conforms to the TokenCache interface:
TokenCache

export interface TokenCache {
getToken: (key: string) => Promise<string | undefined | null>
saveToken: (key: string, token: string) => Promise<void>
clearToken?: (key: string) => void
}

The following example demonstrates an Expo layout that defines a custom token cache to securely store the user's session JWT using expo-secure-store:

Important

Data stored with expo-secure-store may not persist between new builds of your application unless you clear the app data of the previously installed build.
app/\_layout.tsx

import \* as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'

export default function RootLayout() {
const tokenCache = {
async getToken(key: string) {
try {
const item = await SecureStore.getItemAsync(key)
if (item) {
console.log(`${key} was used 🔐 \n`)
} else {
console.log('No values stored under key: ' + key)
}
return item
} catch (error) {
console.error('SecureStore get item error: ', error)
await SecureStore.deleteItemAsync(key)
return null
}
},
async saveToken(key: string, value: string) {
try {
return SecureStore.setItemAsync(key, value)
} catch (err) {
return
}
},
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
throw new Error(
'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
)
}

return (
<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
<ClerkLoaded>
<Slot />
</ClerkLoaded>
</ClerkProvider>
)
}

Tip

When you sign a user out with signOut(), Clerk will remove the user's session JWT from the token cache.
Conditionally render content

You can control which content signed-in and signed-out users can see with Clerk's control components. For this quickstart, you'll use:

    <SignedIn>: Children of this component can only be seen while signed in.
    <SignedOut>: Children of this component can only be seen while signed out.

To get started, create a (home) route group with the following layout file:
app/(home)/\_layout.tsx

import { Stack } from 'expo-router/stack'

export default function Layout() {
return <Stack />
}

Then, in the same folder, create an index.tsx file and add the following code. It displays the user's email if they're signed in, or sign-in and sign-up links if they're not:
app/(home)/index.tsx

import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Page() {
const { user } = useUser()

return (
<View>
<SignedIn>
<Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
</SignedIn>
<SignedOut>
<Link href="/(auth)/sign-in">
<Text>Sign In</Text>
</Link>
<Link href="/(auth)/sign-up">
<Text>Sign Up</Text>
</Link>
</SignedOut>
</View>
)
}

Add sign-up and sign-in pages

Clerk currently only supports control components for Expo native. UI components are only available for Expo web. Instead, you must build custom flows using Clerk's API. The following sections demonstrate how to build custom email/password sign-up and sign-in flows. If you want to use different authentication methods, such as passwordless or OAuth, see the dedicated custom flow guides.

First, protect your auth routes in the layout. Create a new route group (auth) with a \_layout.tsx file. This layout will redirect users to the home page if they're already signed in:
/app/(auth)/\_layout.tsx

import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
const { isSignedIn } = useAuth()

if (isSignedIn) {
return <Redirect href={'/'} />
}

return <Stack />
}

Sign-up page

The following example creates a sign-up page that allows users to sign up using email address and password, and sends an email verification code to confirm their email address.
/app/(auth)/sign-up.tsx

import \* as React from 'react'
import { TextInput, Button, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function SignUpScreen() {
const { isLoaded, signUp, setActive } = useSignUp()
const router = useRouter()

const [emailAddress, setEmailAddress] = React.useState('')
const [password, setPassword] = React.useState('')
const [pendingVerification, setPendingVerification] = React.useState(false)
const [code, setCode] = React.useState('')

const onSignUpPress = async () => {
if (!isLoaded) {
return
}

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }

}

const onPressVerify = async () => {
if (!isLoaded) {
return
}

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }

}

return (
<View>
{!pendingVerification && (
<>
<TextInput
autoCapitalize="none"
value={emailAddress}
placeholder="Email..."
onChangeText={(email) => setEmailAddress(email)}
/>
<TextInput
value={password}
placeholder="Password..."
secureTextEntry={true}
onChangeText={(password) => setPassword(password)}
/>
<Button title="Sign Up" onPress={onSignUpPress} />
</>
)}
{pendingVerification && (
<>
<TextInput value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
<Button title="Verify Email" onPress={onPressVerify} />
</>
)}
</View>
)
}

Sign-in page

The following example creates a sign-in page that allows users to sign in using email address and password, or navigate to the sign-up page.
/app/(auth)/sign-in.tsx

import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View } from 'react-native'
import React from 'react'

export default function Page() {
const { signIn, setActive, isLoaded } = useSignIn()
const router = useRouter()

const [emailAddress, setEmailAddress] = React.useState('')
const [password, setPassword] = React.useState('')

const onSignInPress = React.useCallback(async () => {
if (!isLoaded) {
return
}

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }

}, [isLoaded, emailAddress, password])

return (
<View>
<TextInput
autoCapitalize="none"
value={emailAddress}
placeholder="Email..."
onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
/>
<TextInput
value={password}
placeholder="Password..."
secureTextEntry={true}
onChangeText={(password) => setPassword(password)}
/>
<Button title="Sign In" onPress={onSignInPress} />
<View>
<Text>Don't have an account?</Text>
<Link href="/sign-up">
<Text>Sign up</Text>
</Link>
</View>
</View>
)
}

For more information about building these custom flows, including guided comments in the code examples, see the Build a custom email/password authentication flow guide.
Create your first user

Run your project with the following command:
npm
yarn
pnpm
terminal

npm start

Now visit your app's homepage at http://localhost:8081. Sign up to create your first user.
