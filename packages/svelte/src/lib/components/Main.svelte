<script lang="ts">
import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

import type { HTMLAttributes } from "svelte/elements";

export interface MainProps extends Omit<HTMLAttributes<HTMLElement>, "class"> {
  class?: ClassValue;
}

let { class: className, children, ...restProps }: MainProps = $props();
</script>

<main data-slot="main" class={cx(className)} {...restProps}>
  {@render children?.()}
</main>
