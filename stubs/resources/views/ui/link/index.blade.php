@props([
    'type' => 'button',
    'label' => null,
    'active' => false,
    'disabled' => false,
    'external' => null,
    'color' => null,
    'variant' => null,
    'target' => null,
    'rel' => null,
    'noRel' => false,
])

@php
    $classes = Vee\Ui::classes()
        ->add('inline font-medium')
        ->add('underline-offset-[6px] hover:decoration-current')
        ->add($disabled ? 'cursor-not-allowed opacity-75' : '')
        ->add(! $active && ! $disabled ? 'transition-colors' : '')
        ->add(
            match ($variant) {
                'ghost' => 'no-underline hover:underline',
                'subtle' => 'no-underline',
                default => 'underline',
            },
        )
        ->add(
            match ($variant) {
                'subtle' => match ($color) {
                    'primary' => 'text-primary/70 hover:text-primary',
                    'secondary' => 'text-secondary/70 hover:text-secondary',
                    'accent' => 'text-accent/70 hover:text-accent',
                    'gray' => 'text-gray/70 hover:text-gray',
                    'success' => 'text-success/70 hover:text-success',
                    'info' => 'text-info/70 hover:text-info',
                    'warning' => 'text-warning/70 hover:text-warning',
                    'error' => 'text-error/70 hover:text-error',
                    default => 'text-muted hover:text-default',
                },
                default => match ($color) {
                    'primary' => 'text-primary decoration-[--alpha(var(--color-primary) / 50%)]',
                    'secondary' => 'text-secondary decoration-[--alpha(var(--color-secondary) / 50%)]',
                    'accent' => 'text-accent decoration-[--alpha(var(--color-accent) / 50%)]',
                    'gray' => 'text-gray decoration-[--alpha(var(--color-gray) / 50%)]',
                    'success' => 'text-success decoration-[--alpha(var(--color-success) / 50%)]',
                    'info' => 'text-info decoration-[--alpha(var(--color-info) / 50%)]',
                    'warning' => 'text-warning decoration-[--alpha(var(--color-warning) / 50%)]',
                    'error' => 'text-error decoration-[--alpha(var(--color-error) / 50%)]',
                    default => 'text-default decoration-default/20',
                },
            },
        );

    if ($disabled) {
        $attributes = $attributes->except(['href', 'target', 'rel']);
    }

    if ($target === null && $external) {
        $target = '_blank';
    }

    if (! $noRel && $rel === null && $target === '_blank') {
        $rel = 'noopener noreferrer';
    } elseif (is_array($rel)) {
        $rel = implode(' ', $rel);
    }
@endphp

<a
    type="{{ $type }}"
    @if($disabled) aria-disabled="true" tabindex="-1" @endif
    @if($target) target="{{ $target }}" @endif
    @if($rel) rel="{{ $rel }}" @endif
    {{ $attributes->class($classes) }}
    data-ui-link
>
    {{ $label ?? $slot }}
</a>
