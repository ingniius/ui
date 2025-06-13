<?php

declare(strict_types=1);

namespace Vee;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Exception;

final class DateRange extends CarbonPeriod
{
    protected $preset;

    public function __construct(...$arguments)
    {
        parent::__construct(...$arguments);
    }

    public static function today()
    {
        return self::fromPreset(DateRangePreset::Today);
    }

    public static function yesterday()
    {
        return self::fromPreset(DateRangePreset::Yesterday);
    }

    public static function thisWeek()
    {
        return self::fromPreset(DateRangePreset::ThisWeek);
    }

    public static function lastWeek()
    {
        return self::fromPreset(DateRangePreset::LastWeek);
    }

    public static function last7Days()
    {
        return self::fromPreset(DateRangePreset::Last7Days);
    }

    public static function thisMonth()
    {
        return self::fromPreset(DateRangePreset::ThisMonth);
    }

    public static function lastMonth()
    {
        return self::fromPreset(DateRangePreset::LastMonth);
    }

    public static function thisQuarter()
    {
        return self::fromPreset(DateRangePreset::ThisQuarter);
    }

    public static function lastQuarter()
    {
        return self::fromPreset(DateRangePreset::LastQuarter);
    }

    public static function thisYear()
    {
        return self::fromPreset(DateRangePreset::ThisYear);
    }

    public static function lastYear()
    {
        return self::fromPreset(DateRangePreset::LastYear);
    }

    public static function last14Days()
    {
        return self::fromPreset(DateRangePreset::Last14Days);
    }

    public static function last30Days()
    {
        return self::fromPreset(DateRangePreset::Last30Days);
    }

    public static function last3Months()
    {
        return self::fromPreset(DateRangePreset::Last3Months);
    }

    public static function last6Months()
    {
        return self::fromPreset(DateRangePreset::Last6Months);
    }

    public static function yearToDate()
    {
        return self::fromPreset(DateRangePreset::YearToDate);
    }

    public static function allTime($start)
    {
        $instance = new self(Carbon::parse($start), Carbon::now());
        $instance->preset = DateRangePreset::AllTime;

        return $instance;
    }

    public function start(): ?Carbon
    {
        $startDate = $this->getStartDate();

        return $startDate ? Carbon::instance($startDate) : null;
    }

    public function end(): ?Carbon
    {
        $endDate = $this->getEndDate();

        return $endDate ? Carbon::instance($endDate) : null;
    }

    public function preset(): ?DateRangePreset
    {
        return $this->preset;
    }

    public function hasStart(): bool
    {
        return $this->getStartDate() !== null;
    }

    public function hasEnd(): bool
    {
        return $this->getEndDate() !== null;
    }

    public function hasPreset(): bool
    {
        return $this->preset !== null;
    }

    public function isNotAllTime(): bool
    {
        return $this->preset !== DateRangePreset::AllTime;
    }

    protected static function fromPreset(DateRangePreset $preset)
    {
        if ($preset === DateRangePreset::AllTime) {
            throw new Exception('All time date range is not supported via this constructor because it requires a start date. Please use the ::allTime($start) constructor instead.');
        }

        $instance = new self(...$preset->dates());
        $instance->preset = $preset;

        return $instance;
    }
}
