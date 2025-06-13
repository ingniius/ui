<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Carbon;

enum DateRangePreset: string
{
    case Today = 'today';
    case Yesterday = 'yesterday';
    case ThisWeek = 'thisWeek';
    case LastWeek = 'lastWeek';
    case Last7Days = 'last7Days';
    case ThisMonth = 'thisMonth';
    case LastMonth = 'lastMonth';
    case ThisQuarter = 'thisQuarter';
    case LastQuarter = 'lastQuarter';
    case ThisYear = 'thisYear';
    case LastYear = 'lastYear';
    case Last14Days = 'last14Days';
    case Last30Days = 'last30Days';
    case Last3Months = 'last3Months';
    case Last6Months = 'last6Months';
    case YearToDate = 'yearToDate';
    case AllTime = 'allTime';
    case Custom = 'custom';

    public function dates(?Carbon $start = null)
    {
        return match ($this) {
            self::Today => [Carbon::now()->startOfDay(), Carbon::now()->endOfDay()],
            self::Yesterday => [Carbon::now()->subDay()->startOfDay(), Carbon::now()->subDay()->endOfDay()],
            self::ThisWeek => [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()],
            self::LastWeek => [Carbon::now()->subWeek()->startOfWeek(), Carbon::now()->subWeek()->endOfWeek()],
            self::Last7Days => [Carbon::now()->subDays(7)->addDay()->startOfDay(), Carbon::now()->endOfDay()],
            self::ThisMonth => [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()],
            self::LastMonth => [Carbon::now()->subMonth()->startOfMonth(), Carbon::now()->subMonth()->endOfMonth()],
            self::ThisQuarter => [Carbon::now()->startOfQuarter(), Carbon::now()->endOfQuarter()],
            self::LastQuarter => [Carbon::now()->subQuarter()->startOfQuarter(), Carbon::now()->subQuarter()->endOfQuarter()],
            self::ThisYear => [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()],
            self::LastYear => [Carbon::now()->subYear()->startOfYear(), Carbon::now()->subYear()->endOfYear()],
            self::Last14Days => [Carbon::now()->subDays(14)->addDay()->startOfDay(), Carbon::now()->endOfDay()],
            self::Last30Days => [Carbon::now()->subDays(30)->addDay()->startOfDay(), Carbon::now()->endOfDay()],
            self::Last3Months => [Carbon::now()->subMonths(3)->addDay()->startOfDay(), Carbon::now()->endOfDay()],
            self::Last6Months => [Carbon::now()->subMonths(6)->addDay()->startOfDay(), Carbon::now()->endOfDay()],
            self::YearToDate => [Carbon::now()->startOfYear(), Carbon::now()->endOfDay()],
            self::AllTime => [$start, Carbon::now()->endOfDay()],
        };
    }

    public function label()
    {
        return match ($this) {
            self::Today => __('Today'),
            self::Yesterday => __('Yesterday'),
            self::ThisWeek => __('This Week'),
            self::LastWeek => __('Last Week'),
            self::Last7Days => __('Last 7 Days'),
            self::ThisMonth => __('This Month'),
            self::LastMonth => __('Last Month'),
            self::ThisQuarter => __('This Quarter'),
            self::LastQuarter => __('Last Quarter'),
            self::ThisYear => __('This Year'),
            self::LastYear => __('Last Year'),
            self::Last14Days => __('Last 14 Days'),
            self::Last30Days => __('Last 30 Days'),
            self::Last3Months => __('Last 3 Months'),
            self::Last6Months => __('Last 6 Months'),
            self::YearToDate => __('Year to Date'),
            self::AllTime => __('All Time'),
            self::Custom => __('Custom'),
        };
    }
}
