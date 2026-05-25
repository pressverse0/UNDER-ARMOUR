<?php

namespace App\Services;

class TaxService
{
    /**
     * Tax rates by state (US)
     */
    private const TAX_RATES = [
        'AL' => 0.04,
        'AK' => 0.00,
        'AZ' => 0.056,
        'AR' => 0.065,
        'CA' => 0.0725,
        'CO' => 0.029,
        'CT' => 0.0635,
        'DE' => 0.00,
        'FL' => 0.06,
        'GA' => 0.04,
        'HI' => 0.04,
        'ID' => 0.06,
        'IL' => 0.0625,
        'IN' => 0.07,
        'IA' => 0.06,
        'KS' => 0.065,
        'KY' => 0.06,
        'LA' => 0.045,
        'ME' => 0.055,
        'MD' => 0.06,
        'MA' => 0.0625,
        'MI' => 0.06,
        'MN' => 0.06875,
        'MS' => 0.07,
        'MO' => 0.0725,
        'MT' => 0.00,
        'NE' => 0.055,
        'NV' => 0.0685,
        'NH' => 0.00,
        'NJ' => 0.0625,
        'NM' => 0.0775,
        'NY' => 0.04,
        'NC' => 0.045,
        'ND' => 0.05,
        'OH' => 0.0575,
        'OK' => 0.045,
        'OR' => 0.00,
        'PA' => 0.06,
        'RI' => 0.07,
        'SC' => 0.06,
        'SD' => 0.045,
        'TN' => 0.0925,
        'TX' => 0.0625,
        'UT' => 0.0595,
        'VT' => 0.06,
        'VA' => 0.0575,
        'WA' => 0.065,
        'WV' => 0.06,
        'WI' => 0.05,
        'WY' => 0.04,
    ];

    /**
     * Calculate tax for an amount in a state.
     */
    public static function calculateTax(float $amount, string $state): float
    {
        $state = strtoupper($state);
        $rate = self::TAX_RATES[$state] ?? 0.06; // Default 6% if state not found

        return round($amount * $rate, 2);
    }

    /**
     * Get tax rate for a state.
     */
    public static function getTaxRate(string $state): float
    {
        $state = strtoupper($state);
        return self::TAX_RATES[$state] ?? 0.06;
    }

    /**
     * Calculate total with tax.
     */
    public static function calculateTotal(float $subtotal, string $state): array
    {
        $tax = self::calculateTax($subtotal, $state);
        $total = $subtotal + $tax;

        return [
            'subtotal' => round($subtotal, 2),
            'tax' => $tax,
            'total' => round($total, 2),
            'tax_rate' => self::getTaxRate($state),
        ];
    }

    /**
     * Get all tax rates.
     */
    public static function getAllTaxRates(): array
    {
        return self::TAX_RATES;
    }

    /**
     * Calculate tax for multiple items.
     */
    public static function calculateTaxForItems(array $items, string $state): float
    {
        $subtotal = array_reduce($items, function ($carry, $item) {
            return $carry + ($item['price'] * $item['quantity']);
        }, 0);

        return self::calculateTax($subtotal, $state);
    }
}
