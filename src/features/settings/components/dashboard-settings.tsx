"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CreditCard, Globe, Mail } from "lucide-react";

export default function SettingsPage() {
    const [storeTimezone, setStoreTimezone] = useState("UTC");
    const [currency, setCurrency] = useState("USD");

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Dashboard Settings</h1>
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="store">Store Information</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>
                                Manage your general dashboard preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="language">
                                    Dashboard Language
                                </Label>
                                <Select defaultValue="en">
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">
                                            English
                                        </SelectItem>
                                        <SelectItem value="es">
                                            Español
                                        </SelectItem>
                                        <SelectItem value="fr">
                                            Français
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Store Timezone</Label>
                                <Select
                                    value={storeTimezone}
                                    onValueChange={setStoreTimezone}
                                >
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="Select Timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UTC">UTC</SelectItem>
                                        <SelectItem value="EST">
                                            Eastern Standard Time (EST)
                                        </SelectItem>
                                        <SelectItem value="PST">
                                            Pacific Standard Time (PST)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="dark-mode" />
                                <Label htmlFor="dark-mode">
                                    Enable Dark Mode
                                </Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="store">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Information</CardTitle>
                            <CardDescription>
                                Manage your store details and settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="store-name">Store Name</Label>
                                <Input
                                    id="store-name"
                                    placeholder="Enter your store name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="store-url">Store URL</Label>
                                <div className="flex items-center space-x-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <Input
                                        id="store-url"
                                        placeholder="www.yourstore.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="store-currency">
                                    Store Currency
                                </Label>
                                <Select
                                    value={currency}
                                    onValueChange={setCurrency}
                                >
                                    <SelectTrigger id="store-currency">
                                        <SelectValue placeholder="Select Currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">
                                            US Dollar (USD)
                                        </SelectItem>
                                        <SelectItem value="EUR">
                                            Euro (EUR)
                                        </SelectItem>
                                        <SelectItem value="GBP">
                                            British Pound (GBP)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Settings</CardTitle>
                            <CardDescription>
                                Configure your payment methods and options.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Accepted Payment Methods</Label>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="credit-card" />
                                    <Label htmlFor="credit-card">
                                        Credit Card
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="paypal" />
                                    <Label htmlFor="paypal">PayPal</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="bank-transfer" />
                                    <Label htmlFor="bank-transfer">
                                        Bank Transfer
                                    </Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transaction-fee">
                                    Transaction Fee (%)
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <Input
                                        id="transaction-fee"
                                        placeholder="Enter transaction fee percentage"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Manage how you receive notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Email Notifications</Label>
                                <div className="flex items-center space-x-2">
                                    <Switch id="new-order-email" />
                                    <Label htmlFor="new-order-email">
                                        New Order
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="low-stock-email" />
                                    <Label htmlFor="low-stock-email">
                                        Low Stock Alert
                                    </Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Push Notifications</Label>
                                <div className="flex items-center space-x-2">
                                    <Switch id="new-order-push" />
                                    <Label htmlFor="new-order-push">
                                        New Order
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="customer-message-push" />
                                    <Label htmlFor="customer-message-push">
                                        Customer Message
                                    </Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notification-email">
                                    Notification Email
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <Input
                                        id="notification-email"
                                        placeholder="Enter your notification email"
                                        type="email"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <div className="mt-6 flex justify-end">
                <Button>Save Changes</Button>
            </div>
        </div>
    );
}
