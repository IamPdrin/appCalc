import { Stack } from 'expo-router/stack';

export default function Layout () {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="formas/circulo" />
            <Stack.Screen name="formas/quadrado" />
            <Stack.Screen name="formas/elipse" />
            <Stack.Screen name="formas/triangulo" />
        </Stack>
    );
}