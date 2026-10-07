import { useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from '@/components/ui/combobox'

const frameworks = ['Next.js', 'Remix', 'Astro', 'Vite', 'Nuxt', 'SvelteKit', 'SolidStart', 'TanStack Start']

export default function ComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({ initialItems: frameworks, filter: contains })

  return (
    <Combobox
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      className="w-60"
    >
      <ComboboxInput placeholder="Select framework…" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        {collection.items.map((item) => (
          <ComboboxItem key={item} item={item}>
            {item}
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  )
}
