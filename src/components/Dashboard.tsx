// src/components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define TypeScript interfaces
interface Transaction {
    id: string;
    originalAmount: number;
    roundedAmount: number;
    savingsAmount: number;
    merchant: string;
    date: string;
    type: string;
    status: string;
}

interface SavingsGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string | null;
    status: string;
}

interface UserData {
    totalSaved: number;
    currency: string;
}

interface DashboardProps {
    userData: UserData;
    recentTransactions: Transaction[];
    goals: SavingsGoal[];
}

export default function Dashboard({ userData, recentTransactions, goals }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'goals'>('overview');
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState({
        name: '',
        targetAmount: 0,
        deadline: '',
    });

    // Calculate total saved from goals for verification
    const totalGoalsSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

    // Format currency based on user preference
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: userData.currency || 'MAD',
        }).format(amount);
    };

    // Calculate progress percentage for a goal
    const calculateProgress = (current: number, target: number) => {
        return target > 0 ? Math.min(100, (current / target) * 100) : 0;
    };

    // Handle adding a new goal
    const handleAddGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implementation would connect to your API route
        console.log('Adding new goal:', newGoal);
        // Reset form and close modal
        setNewGoal({ name: '', targetAmount: 0, deadline: '' });
        setIsAddGoalModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <header className="bg-white rounded-lg shadow p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord Dirham Smart</h1>
                <p className="text-gray-600">Votre épargne automatique et intelligente</p>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Summary */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Total Savings Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Épargne Totale</h2>
                        <p className="text-3xl font-bold text-green-600">{formatCurrency(userData.totalSaved)}</p>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Épargné ce mois</span>
                                <span>{formatCurrency(userData.totalSaved * 0.2)}</span> {/* Example calculation */}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: '20%' }} /* Example progress */
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Actions Rapides</h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => setIsAddGoalModalOpen(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                                Nouvel Objectif
                            </button>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                                Effectuer un Dépôt
                            </button>
                            <Link href="/goals" className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-center">
                                Voir Tous les Objectifs
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-2">
                    {/* Tab Navigation */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="flex border-b">
                            <button
                                className={`py-4 px-6 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Aperçu
                            </button>
                            <button
                                className={`py-4 px-6 font-medium ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('transactions')}
                            >
                                Transactions
                            </button>
                            <button
                                className={`py-4 px-6 font-medium ${activeTab === 'goals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('goals')}
                            >
                                Objectifs
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg shadow p-6">
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Aperçu de l'Épargne</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-blue-800">Transactions Ce Mois</h3>
                                        <p className="text-2xl font-bold text-blue-600">24</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-green-800">Épargne Ce Mois</h3>
                                        <p className="text-2xl font-bold text-green-600">{formatCurrency(78.50)}</p>
                                    </div>
                                </div>

                                <h3 className="font-medium text-gray-700 mb-3">Objectifs en Cours</h3>
                                <div className="space-y-4">
                                    {goals.slice(0, 3).map((goal) => (
                                        <div key={goal.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-gray-800">{goal.name}</h4>
                                                <span className="text-sm font-medium text-blue-600">
                          {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                        </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                                                ></div>
                                            </div>
                                            {goal.deadline && (
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Échéance: {new Date(goal.deadline).toLocaleDateString('fr-MA')}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'transactions' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dernières Transactions</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Marchand
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Montant
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Économisé
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {recentTransactions.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {transaction.merchant}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatCurrency(transaction.originalAmount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                                    +{formatCurrency(transaction.savingsAmount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(transaction.date).toLocaleDateString('fr-MA')}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link href="/transactions" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Voir toutes les transactions →
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'goals' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Vos Objectifs d'Épargne</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {goals.map((goal) => (
                                        <div key={goal.id} className="border rounded-lg p-6">
                                            <h3 className="text-lg font-medium text-gray-800 mb-2">{goal.name}</h3>
                                            <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {formatCurrency(goal.currentAmount)}
                        </span>
                                                <span className="text-gray-500">
                          sur {formatCurrency(goal.targetAmount)}
                        </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(0)}% complété
                        </span>
                                                {goal.deadline && (
                                                    <span className="text-sm text-gray-500">
                            Échéance: {new Date(goal.deadline).toLocaleDateString('fr-MA')}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Goal Modal */}
            {isAddGoalModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nouvel Objectif d'Épargne</h2>
                        <form onSubmit={handleAddGoal}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'objectif</label>
                                    <input
                                        type="text"
                                        required
                                        value={newGoal.name}
                                        onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: Nouveau Smartphone"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Montant Cible</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={newGoal.targetAmount}
                                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Montant en DH"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'Échéance (optionnel)</label>
                                    <input
                                        type="date"
                                        value={newGoal.deadline}
                                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddGoalModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Créer l'Objectif
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}